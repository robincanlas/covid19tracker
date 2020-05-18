import { Models } from 'app/models';

export const initialState = {
	statistics: [],
	lastUpdate: '',
	isLoading: true,
	error: ''
};

export type StatisticsState = {
	statistics: Models.Statistics[];
	lastUpdate: string;
	isLoading: boolean;
	error: string;
};