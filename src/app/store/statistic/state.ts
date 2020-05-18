import { Models } from 'app/models';

export const initialState = {
	statistics: [],
	lastUpdate: '',
	country: '',
	isLoading: true,
	error: ''
};

export type StatisticsState = {
	statistics: Models.Statistics[];
	lastUpdate: string;
	country: string,
	isLoading: boolean;
	error: string;
};