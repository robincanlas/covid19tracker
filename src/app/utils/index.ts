export const CONSTANTS = {
	covid19Endpoint: 'https://disease.sh/v2/jhucsse',
	mapboxAccessToken: 'pk.eyJ1IjoicnVrYmluMDExIiwiYSI6ImNrYWdrbDI3bTA5NzgyeHBuaWkzbWIxeDQifQ.C7KY2elb_bs0qrST3HvSSQ',
	mapboxStyle: 'mapbox://styles/rukbin011/ckagtrcc110de1ipt2pzqqn5v'
};

export const constructFlag = (countryISO: string, className: string): string => {
	return Boolean(countryISO)
	? `<img class=${className} src="https://www.countryflags.io/${countryISO}/flat/64.png"></img>`
	: '';
};

export const paintProperties = (highestCases: number, casesSample: number[]): any => {
	return {
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
	};
};