// import { Models } from 'app/models';

export const initialState = {
	dailyData: [],
	isLoading: true,
	error: ''
};

export type ChartState = {
	dailyData: any,
	isLoading: boolean;
	error: string;
};