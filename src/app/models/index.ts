export namespace Models {
	export interface Countries {
		text: string;
		key: string;
		value: string;

		image: string;
	}

	export interface CountriesPayload {
		active: number;
		activePerOneMillion: number;
		cases: number;
		casesPerOneMillion: number;
		continent: string;
		country: string;
		countryInfo: {
			flag: any;
			iso2: any;
			iso3: any;
			lat: any;
			long: any;
			_id: number;
		};
		critical: number;
		criticalPerOneMillion: number;
		deaths: number;
		deathsPerOneMillion: number;
		population: number;
		recovered: number;
		recoveredPerOneMillion: number;
		tests: number;
		testsPerOneMillion: number;
		todayCases: number;
		todayDeaths: number;
		updated: number;
	}

	export interface Detail {
		value: number;
		detail: string;
	}

	export interface Statistics {
		name: string;
		value: number;
	}

	export interface EndPoint {
		url: string;
	}

	export interface Chart {
		confirmed: number;
		deaths: number;
		reportDate: string;
		date: string;
	}

	export interface DailyData {
		date: string;
		confirmed: number; 
		deaths: number;
		recovered: number;
	}
}