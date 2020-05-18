export namespace Models {
	export interface Countries {
		text: string;
		key: string;
		value: string;
	}

	export interface Detail {
		value: number;
		detail: string;
	}

	export interface Statistics extends Detail {
		name: string;
	}

	export interface EndPoint {
		url: string;
		countries: string;
	}

	export interface Chart {
		confirmed: number;
		deaths: number;
		reportDate: string;
		date: string;
	}
}