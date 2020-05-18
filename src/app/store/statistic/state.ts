import { Models } from 'app/models';

export const initialState = {
	statistics: [],
	isLoading: true,
	error: ''
};

export type StatisticsState = {
	statistics: Models.Statistics[],
	isLoading: boolean;
	error: string;
};