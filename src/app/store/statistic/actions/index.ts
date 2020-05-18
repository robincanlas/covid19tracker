import { AnyAction } from 'redux';
import { createAction } from 'redux-actions';
import { ActionTypes } from 'app/constants';
import axios from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

type Thunk = ThunkAction<void, {}, {}, AnyAction>;

export namespace StatisticsActions {
	export const getStats = (endPoint: string, country: string): Thunk => {
		const request = createAction<{country: string}>(ActionTypes.GET_STATISTICS_REQUEST);
		const success = createAction<any>(ActionTypes.GET_STATISTICS_SUCCESS);
		const failure = createAction<any>(ActionTypes.GET_STATISTICS_FAILED);
		
		return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
			dispatch(request({ country: country }));
			axios.get(endPoint)
				.then(response => {
					dispatch(success(response.data));
				})
				.catch(error => {
					dispatch(failure(error.data));
				});
		};
	};
}

export type StatisticsActions = typeof StatisticsActions;