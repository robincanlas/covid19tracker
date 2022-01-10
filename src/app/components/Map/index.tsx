import * as React from 'react';
import * as style from './style.css';
import { Models } from 'app/models';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import useSWR from 'swr'; // React hook to fetch the data
import lookup from 'country-code-lookup'; // npm module to get ISO Code for countries
import axios from 'axios';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RootState } from 'app/store';
import { Icon } from 'semantic-ui-react';
import { ActionTypes, paintProperties, CONSTANTS, constructFlag } from 'app/constants';

// Mapbox css - needed to make tooltips work later in this article
// import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = CONSTANTS.mapboxAccessToken;

export namespace Map {
	export interface Props {
		mapIsLoaded: () => void;
	}
}

export const Map: React.FC<Map.Props> = (props: Map.Props) => {
	const mapboxElRef = React.useRef(null); // DOM element to render map
	const [mapState, setMap] = React.useState<mapboxgl.Map | null>(null);
	const fetcher = (url: string) =>
		axios.get(url)
			.then(r => r.data)
			.then((country: Models.MapData[]) => {
				localStorage.setItem('updated', new Date().toString());
				const features = country.filter(element => {
					return element.coordinates.latitude !== ''; // removed no coordinates
				}).map((point, index) => (
					{
					'type': 'Feature' as const,
					geometry: {
						'type': 'Point' as const,
						coordinates: [
							point.coordinates.longitude,
							point.coordinates.latitude
						]
					},
					properties: {
						'id': index, // unique identifier in this case the index
						'country': point.country,
						'province': point.province,
						'cases': point.stats.confirmed,
						'deaths': point.stats.deaths,
						'recovered': point.stats.recovered,
						'updated': new Date(point.updatedAt).toDateString()
					}
				}));
				localStorage.setItem('data', JSON.stringify(features));
				return features;
			});
		
	const [shouldFetch, setShouldFetch] = React.useState<boolean>(false);

	React.useEffect(() => {
		// FETCH ONLY IF THE LAST UPDATED TIME IS GREATER THAN 4
		if (localStorage.getItem('updated') && localStorage.getItem('data')) {
			if (Math.floor(Math.abs(new Date().getTime() - new Date(localStorage.getItem('updated') as string).getTime()) / 3600000) > 4) {
				setShouldFetch(true);
			} else {
				setShouldFetch(false);
			}
		} else {
			setShouldFetch(true);
		}
	}, []);
	
	// const { data } = useSWR(CONSTANTS.covid19Endpoint, fetcher);
	const { data } = useSWR(shouldFetch ? CONSTANTS.covid19Endpoint : null, fetcher);
	
	const constructMap = () => {
		const covidData: any = data ? data : JSON.parse(localStorage.getItem('data') as string);
		if (covidData) {
			const highestCases: number = Math.max.apply(Math, covidData.map((o: any) => { return o.properties.cases; }));
			const interpolateCount: number = 7;
			const incremental: number = Math.floor(highestCases / interpolateCount);
			let casesSample: number[] = [];
			for (let i = 1; i <= interpolateCount; i++) {
				casesSample.push(i * incremental);
			}

			// You can store the map instance with useRef too
			const map = new mapboxgl.Map({
				container: mapboxElRef.current!,
				style: CONSTANTS.mapboxStyle,
				center: [121.76572,  13.01153], // initial geo location for Philippines
				zoom: 2 // initial zoom
				// zoom: 4.94 // initial zoom
			});

			// Add navigation controls to the top right of the canvas
			map.addControl(new mapboxgl.NavigationControl());

			// Call this method when the map is loaded
			map.once('load', function() {
				// Add our SOURCE
				// with id 'points'
				map.addSource('points', {
					type: 'geojson',
					data: {
						type: 'FeatureCollection',
						// features: data as Feature<Geometry, GeoJsonProperties>[]
						features: covidData as any // change later
					}
				});

				// Add our layer
				map.addLayer({
					id: 'circles',
					source: 'points', // this should be the id of the source
					type: 'circle',
					// paint properties
					paint: paintProperties(highestCases, casesSample)
				});

				// Create a mapbox popup
				const popup = new mapboxgl.Popup({
					closeButton: false,
					closeOnClick: false
				});

				setMap(map as any);

				// Variable to hold the active country/province on hover
				let lastId: number | null;

				// Mouse move event
				map.on('mousemove', 'circles', e => {
					if (e.features && e.features[0].properties && e.features[0].geometry.type === 'Point') {
						// Get the id from the properties
						const id = e.features[0].properties.id;

						// Only if the id are different we process the tooltip
						if (id !== lastId) {
							lastId = id;

							// Change the pointer type on move move
							map.getCanvas().style.cursor = 'pointer';

							const { cases, deaths, country, province, updated }: any = e.features[0].properties;
							const coordinates = e.features[0].geometry.coordinates!.slice();

							// Get all data for the tooltip
							const countryISO = lookup.byCountry(country)?.iso2 || lookup.byInternet(country)?.iso2;

							const provinceHTML = province !== 'null' ? `<p>Province: <b>${province}</b></p>` : '';

							// Calculate Mortality Rate
							const mortalityRate: string = ((deaths / cases) * 100).toFixed(2);

							// Calculate Active Case
							// const activeCases: number = cases - (deaths + recovered);
							// <p class=${style.activeCases}>Active Cases: <b>${Number(activeCases).toLocaleString()}</b></p>
							// <p class=${style.recovered}>Recovered: <b>${Number(recovered).toLocaleString()}</b></p>
							const countryFlagHTML = constructFlag(countryISO, style.flag);

								const HTML = `<p>Country: <b>${country}</b></p>
												${provinceHTML}
												<p class=${style.cases}>Total Cases: <b>${Number(cases).toLocaleString()}</b></p>
												<p class=${style.deaths}>Deaths: <b>${Number(deaths).toLocaleString()}</b></p>
												<p>Mortality Rate: <b>${mortalityRate}%</b></p>
												<p>Updated: <b>${updated}</b></p>
												${countryFlagHTML}`;

							// Ensure that if the map is zoomed out such that multiple
							// copies of the feature are visible, the popup appears
							// over the copy being pointed to.
							while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
								coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
							}

							popup
								.setLngLat(coordinates as LngLatLike)
								.setHTML(HTML)
								.addTo(map);
						}
					}
				});

				// Mouse leave event
				map.on('mouseleave', 'circles', () => {
					// Reset the last Id
					lastId = null;
					map.getCanvas().style.cursor = '';
					popup.remove();
				});

				props.mapIsLoaded();
			});
		}
	};

	// Initialize our map
	React.useEffect(() => {
		constructMap();
	}, [data]);

	const getCountry = (findCountry: string): string => {
		switch (findCountry) {
			case 'USA':
				return 'US';
			case 'UK':
				return 'United Kingdom';
			default: return findCountry;
		}
	};

	const filteredCountry: string = useSelector((state: RootState) => state.statistic.country, shallowEqual);
	// const countriesPayload: Models.CountriesPayload[] = useSelector((state: RootState) => state.countries.countriesPayload, shallowEqual);
	React.useEffect(() => {
		if (mapState && filteredCountry) {
			let	filter: any = null;
			if (filteredCountry !== 'Global') {
				const newCountry: string = getCountry(filteredCountry);
				filter = ['==', ['get', 'country'], newCountry];
				const covidData: any = JSON.parse(localStorage.getItem('data') as string);
				const country = covidData!.find((element: any) => element.properties.country === newCountry)!;
				if (country) {
					mapState.panTo([+country.geometry.coordinates[0], +country.geometry.coordinates[1]]);
				}
			}
	
			mapState.setFilter('circles', filter);
		}
	}, [filteredCountry, mapState]);

	const dispatch = useDispatch();

	const resetFilter = () => {
		if (mapState) {
			// mapState.setFilter('circles', null);
			dispatch({ type: ActionTypes.SET_GLOBAL_STATISTICS });
		}
	};

	return (
		<React.Fragment>
			{filteredCountry !== 'Global' && <div onClick={resetFilter} className={style.repeat}>
				<Icon size='big' name='repeat' />
			</div>}
			<div id={style.map}>
				<div className={style.mapContainer}>
					{/* Assigned Mapbox container */}
					<div className={style.mapBox} ref={mapboxElRef} />
				</div>
			</div>
		</React.Fragment>
	);
};