import { initialState, StatisticsState } from '../state';
import { Models } from 'app/models';
import { handleActions } from 'redux-actions';
import { ActionTypes } from 'app/constants';

type Payload = Models.Countries[] | Models.Country | string | any;

export const StatisticReducer = handleActions<StatisticsState | Payload, Payload> (
	{
		[ActionTypes.GET_STATISTICS_REQUEST]: (state, action) => {
			return state;
		},
		[ActionTypes.GET_STATISTICS_SUCCESS]: (state, action) => {
			return state;
		},
		[ActionTypes.GET_STATISTICS_FAILED]: (state, action) => {
			return state;
		}
	},
	initialState
);