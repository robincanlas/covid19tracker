import * as React from 'react';
import * as style from './style.css';
import { Models } from 'app/models';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
// import { Feature, Geometry, GeoJsonProperties } from 'geojson';
import useSWR from 'swr'; // React hook to fetch the data
import lookup from 'country-code-lookup'; // npm module to get ISO Code for countries
import axios from 'axios';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RootState } from 'app/store';
import { Icon } from 'semantic-ui-react';
import { ActionTypes } from 'app/constants';

// Mapbox css - needed to make tooltips work later in this article
// import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicnVrYmluMDExIiwiYSI6ImNrYWdrbDI3bTA5NzgyeHBuaWkzbWIxeDQifQ.C7KY2elb_bs0qrST3HvSSQ';

export const Map: React.FC = () => {
	// let map: mapboxgl.Map;
	const mapboxElRef = React.useRef(null); // DOM element to render map
	const [mapState, setMap] = React.useState<mapboxgl.Map | null>(null);
	const fetcher = (url: string) =>
		axios.get(url)
			.then(r => r.data)
			.then((country: Models.MapData[]) =>
				country.filter(element => {
					return element.coordinates.latitude !== ''; // removed no coordinates
				}).map((point, index) => (
					{
					type: 'Feature' as const,
					geometry: {
						type: 'Point' as const,
						coordinates: [
							point.coordinates.longitude,
							point.coordinates.latitude
						]
					},
					properties: {
						id: index, // unique identifier in this case the index
						country: point.country,
						province: point.province,
						cases: point.stats.confirmed,
						deaths: point.stats.deaths,
						recovered: point.stats.recovered
					}
				}))
			);

	// Fetching our data with swr package
	const { data } = useSWR('https://disease.sh/v2/jhucsse', fetcher);
	
	const constructMap = () => {
		if (data) {
			const highestCases: number = Math.max.apply(Math, data.map((o) => { return o.properties.cases; }));
			const interpolateCount: number = 7;
			const incremental: number = Math.floor(highestCases / interpolateCount);
			let casesSample: number[] = [];
			for (let i = 1; i <= interpolateCount; i++) {
				casesSample.push(i * incremental);
			}

			// You can store the map instance with useRef too
			const map = new mapboxgl.Map({
				container: mapboxElRef.current!,
				style: 'mapbox://styles/rukbin011/ckagtrcc110de1ipt2pzqqn5v',
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
						features: data as any // change later
					}
				});

				// Add our layer
				map.addLayer({
					id: 'circles',
					source: 'points', // this should be the id of the source
					type: 'circle',
					// paint properties
					paint: {
						'circle-opacity': 0.75,
						'circle-stroke-width': [
							'interpolate',
							['linear'],
							['get', 'cases'],
							1, 1,
							highestCases, 1.75,
						],
						'circle-radius': [
							'interpolate',
							['linear'],
							['get', 'cases'],
							1, 4,
							1000, 6,
							4000, 8,
							8000, 10,
							12000, 15,
							casesSample[0], 24,
							casesSample[1], 28,
							casesSample[2], 32,
							casesSample[3], 36,
							casesSample[4], 40,
							casesSample[5], 44,
							highestCases, 48
						],
						'circle-color': [
							'interpolate',
							['linear'],
							['get', 'cases'],
							1, '#ffffb2',
							5000, '#fed976',
							10000, '#feb24c',
							25000, '#fd8d3c',
							50000, '#fc4e2a',
							75000, '#e31a1c',
							highestCases, '#b10026'
						],
					}
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

							const { cases, deaths, country, province, recovered }: any = e.features[0].properties;
							const coordinates = e.features[0].geometry.coordinates!.slice();

							// Get all data for the tooltip
							const countryISO = lookup.byCountry(country)?.iso2 || lookup.byInternet(country)?.iso2;

							const provinceHTML = province !== 'null' ? `<p>Province: <b>${province}</b></p>` : '';

							const mortalityRate = ((deaths / cases) * 100).toFixed(2);

							const countryFlagHTML = Boolean(countryISO)
								? `<img class=${style.flag} src="https://www.countryflags.io/${countryISO}/flat/64.png"></img>`
								: '';

							const HTML = `<p>Country: <b>${country}</b></p>
												${provinceHTML}
												<p class=${style.cases}>Cases: <b>${Number(cases).toLocaleString()}</b></p>
												<p class=${style.deaths}>Deaths: <b>${Number(deaths).toLocaleString()}</b></p>
												<p class=${style.recovered}>Recovered: <b>${Number(recovered).toLocaleString()}</b></p>
												<p>Mortality Rate: <b>${mortalityRate}%</b></p>
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
				const country = data!.find(element => element.properties.country === newCountry)!;
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
		<>
			{filteredCountry !== 'Global' && <div onClick={resetFilter} className={style.repeat}>
				<Icon size='big' name='repeat' />
			</div>}
			<div id={style.map}>
				<div className={style.mapContainer}>
					{/* Assigned Mapbox container */}
					<div className={style.mapBox} ref={mapboxElRef} />
				</div>
			</div>
		</>
	);
};