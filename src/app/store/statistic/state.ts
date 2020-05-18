import { Models } from 'app/models';

export const initialState = {
	countries: [],
	country: {},
	isLoading: true,
	error: ''
};

export type StatisticsState = {
	countries: Models.Countries[],
	country: Models.Country,
	isLoading: boolean;
	error: string;
};