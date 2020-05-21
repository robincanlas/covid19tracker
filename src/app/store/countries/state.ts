import { Models } from 'app/models';

export const initialState = {
	list: [
		{ key: 'Global', value: 'Global', text: 'Global', image: '' }
	],
	countriesPayload: [],
	isLoading: true,
	error: ''
};

export type CountriesState = {
	list: Models.Countries[];
	countriesPayload: Models.CountriesPayload[];
	isLoading: boolean;
	error: string;
};