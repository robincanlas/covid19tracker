import { Models } from 'app/models';

export const initialState = {
	list: [
		{ key: 'Global', value: 'Global', text: 'Global' }
	],
	isLoading: true,
	error: ''
};

export type CountriesState = {
	list: Models.Countries[],
	isLoading: boolean;
	error: string;
};