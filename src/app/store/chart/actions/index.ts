import { AnyAction } from 'redux';
import { createAction } from 'redux-actions';
import { ActionTypes, endPoint } from 'app/constants';
import axios from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Models } from 'app/models';
// import { Models } from 'app/models';

type Thunk = ThunkAction<void, {}, {}, AnyAction>;

export namespace ChartActions {
	export const getDaily = (country: string): Thunk => {
		const isGlobal: boolean = country === 'Global';
		const params: string = isGlobal ? 'all' : country;
		const request = createAction(ActionTypes.GET_DAILY_REQUEST);
		const success = createAction<Models.Countries[]>(ActionTypes.GET_DAILY_SUCCESS);
		const failure = createAction<any>(ActionTypes.GET_DAILY_FAILED);
		
		return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
			dispatch(request());
			axios.get(`${endPoint.url}/historical/${params}?lastdays=all`)
				.then(response => {
					dispatch(success(isGlobal ? response.data : response.data.timeline));
				})
				.catch(error => {
					dispatch(failure(error.data));
				});
		};
	};
}

export type ChartActions = typeof ChartActions;