import { initialState, ChartState } from '../state';
import { Models } from 'app/models';
import { handleActions } from 'redux-actions';
import { ActionTypes } from 'app/constants';

type Payload = Models.Chart[] | any;

export const ChartReducer = handleActions<ChartState | Payload, Payload> (
	{
		[ActionTypes.GET_DAILY_REQUEST]: (state, action) => {
			return {
				...state,
				error: '',
				isLoading: true
			};
		},
		[ActionTypes.GET_DAILY_SUCCESS]: (state, action) => {
			const dailyData: Models.DailyData[] = Object.entries(action.payload.cases).map((element, index) => (
				{ 
					date: element[0], 
					confirmed: element[1], 
					deaths: Object.entries(action.payload.deaths)[index][1],
					recovered: Object.entries(action.payload.recovered)[index][1]
				} as Models.DailyData
			));
			return {
				...state,
				isLoading: false,
				dailyData: dailyData
			};
		},
		[ActionTypes.GET_DAILY_FAILED]: (state, action) => {
			return {
				...state,
				isLoading: false,
				error: 'Error Fetching'
			};
		}
	},
	initialState
);