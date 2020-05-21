import { Models } from 'app/models';

export const initialState = {
	statistics: [],
	global: [],
	lastUpdate: '',
	country: '',
	isLoading: true,
	error: ''
};

export type StatisticsState = {
	statistics: Models.Statistics[];
	global: Models.Statistics[];
	lastUpdate: string;
	country: string,
	isLoading: boolean;
	error: string;
};