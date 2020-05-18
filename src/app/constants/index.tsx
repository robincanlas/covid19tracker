import { Models } from 'app/models';

export const assetsPath: string =  '../../assets';
export interface Icon { [key: string]: JSX.Element; }

export const endPoint: Models.EndPoint = {
	url: 'https://covid19.mathdro.id/api/countries/philippines',
	countries: 'https://covid19.mathdro.id/api/countries',
};

export enum ActionTypes {
	GET_STATISTICS_REQUEST = 'GET_STATISTICS_REQUEST',
	GET_STATISTICS_SUCCESS = 'GET_STATISTICS_SUCCESS',
	GET_STATISTICS_FAILED = 'GET_STATISTICS_FAILED',
}