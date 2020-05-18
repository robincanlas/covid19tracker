import { AnyAction } from 'redux';
import { createAction } from 'redux-actions';
import { ActionTypes } from 'app/constants';
import axios from 'axios';
import { endPoint } from 'app/constants';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
// import { Models } from 'app/models';

type Thunk = ThunkAction<void, {}, {}, AnyAction>;

export namespace StatisticsActions {
	export const getStats = (): Thunk => {
		const request = createAction(ActionTypes.GET_STATISTICS_REQUEST);
		const success = createAction<any>(ActionTypes.GET_STATISTICS_SUCCESS);
		const failure = createAction<any>(ActionTypes.GET_STATISTICS_FAILED);
		
		return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
			dispatch(request());
			axios.get(endPoint.url)
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