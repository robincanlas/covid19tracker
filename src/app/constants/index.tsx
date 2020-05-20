import { Models } from 'app/models';

export const assetsPath: string =  '../../assets';
export interface Icon { [key: string]: JSX.Element; }

export const endPoint: Models.EndPoint = {
	url: 'https://disease.sh/v2',
};

export enum Statistics {
	CONFIRMED = 'confirmed',
	RECOVERED = 'recovered',
	DEATHS = 'deaths'
}

export enum ActionTypes {
	GET_STATISTICS_REQUEST = 'GET_STATISTICS_REQUEST',
	GET_STATISTICS_SUCCESS = 'GET_STATISTICS_SUCCESS',
	GET_STATISTICS_FAILED = 'GET_STATISTICS_FAILED',

	GET_COUNTRIES_REQUEST = 'GET_COUNTRIES_REQUEST',
	GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS',
	GET_COUNTRIES_FAILED = 'GET_COUNTRIES_FAILED',

	GET_DAILY_REQUEST = 'GET_DAILY_REQUEST',
	GET_DAILY_SUCCESS = 'GET_DAILY_SUCCESS',
	GET_DAILY_FAILED = 'GET_DAILY_FAILED'
}