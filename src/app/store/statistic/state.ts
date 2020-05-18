import { Models } from 'app/models';

export const initialState = {
	countries: [],
	statistics: [],
	isLoading: true,
	error: ''
};

export type StatisticsState = {
	countries: Models.Countries[],
	statistics: Models.Statistics[],
	isLoading: boolean;
	error: string;
};