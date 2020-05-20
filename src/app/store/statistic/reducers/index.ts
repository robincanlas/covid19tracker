import { initialState, StatisticsState } from '../state';
import { Models } from 'app/models';
import { handleActions } from 'redux-actions';
import { ActionTypes, Statistics } from 'app/constants';

type Payload = Models.Statistics | string | any;

export const StatisticReducer = handleActions<StatisticsState | Payload, Payload> (
	{
		[ActionTypes.GET_STATISTICS_REQUEST]: (state, action) => {
			return {
				...state,
				isLoading: true,
				country: action.payload.country
			};
		},
		[ActionTypes.GET_STATISTICS_SUCCESS]: (state, action) => {
			const { cases, recovered, deaths, updated } = action.payload;
			const statistics: any[] = [ 
				{ value: cases, name: Statistics.CONFIRMED }, 
				{ value: recovered, name: Statistics.RECOVERED }, 
				{ value: deaths, name: Statistics.DEATHS } ];
			return {
				...state,
				isLoading: false,
				statistics: statistics,
				lastUpdate: new Date(updated).toDateString()
			};
		},
		[ActionTypes.GET_STATISTICS_FAILED]: (state, action) => {
			return {
				...state,
				isLoading: false,
				error: 'Error Fetching'
			};
		}
	},
	initialState
);