import { initialState, StatisticsState } from '../state';
import { Models } from 'app/models';
import { handleActions } from 'redux-actions';
import { ActionTypes } from 'app/constants';

type Payload = Models.Statistics | string | any;

export const StatisticReducer = handleActions<StatisticsState | Payload, Payload> (
	{
		[ActionTypes.GET_STATISTICS_REQUEST]: (state, action) => {
			return {
				...state,
				isLoading: true
			};
		},
		[ActionTypes.GET_STATISTICS_SUCCESS]: (state, action) => {
			const { confirmed, recovered, deaths, lastUpdate } = action.payload;
			const statistics: any[] = [ {...confirmed, name: 'confirmed'}, {...recovered, name: 'recovered'}, {...deaths, name: 'deaths'} ];
			return {
				...state,
				isLoading: false,
				statistics: statistics,
				lastUpdate: new Date(lastUpdate as string).toDateString()
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