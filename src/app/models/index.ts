export namespace Models {
	export interface Countries {
		name: string;
		iso2: string;
		iso3: string;
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
}