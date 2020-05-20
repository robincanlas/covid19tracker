import { Models } from 'app/models';

export const initialState = {
	dailyData: [],
	isLoading: true,
	error: ''
};

export type ChartState = {
	dailyData: Models.DailyData[],
	isLoading: boolean;
	error: string;
};