import { AnyAction } from 'redux';
import { createAction } from 'redux-actions';
import { ActionTypes, endPoint } from 'app/constants';
import axios from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Models } from 'app/models';
// import { Models } from 'app/models';

type Thunk = ThunkAction<void, {}, {}, AnyAction>;

export namespace ChartActions {
	export const getDaily = (): Thunk => {
		const request = createAction(ActionTypes.GET_DAILY_REQUEST);
		const success = createAction<Models.Countries[]>(ActionTypes.GET_DAILY_SUCCESS);
		const failure = createAction<any>(ActionTypes.GET_DAILY_FAILED);
		
		return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
			dispatch(request());
			axios.get(`${endPoint.url}/daily`)
				.then(response => {
					dispatch(success(response.data));
				})
				.catch(error => {
					dispatch(failure(error.data));
				});
		};
	};
}

export type ChartActions = typeof ChartActions;