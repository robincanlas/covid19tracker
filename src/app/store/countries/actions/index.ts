import { AnyAction } from 'redux';
import { createAction } from 'redux-actions';
import { ActionTypes, endPoint } from 'app/constants';
import axios from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Models } from 'app/models';
// import { Models } from 'app/models';

type Thunk = ThunkAction<void, {}, {}, AnyAction>;

export namespace CountriesActions {
	export const getCountries = (): Thunk => {
		const request = createAction(ActionTypes.GET_COUNTRIES_REQUEST);
		const success = createAction<Models.Countries[]>(ActionTypes.GET_COUNTRIES_SUCCESS);
		const failure = createAction<any>(ActionTypes.GET_COUNTRIES_FAILED);
		
		return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
			dispatch(request());
			axios.get(endPoint.countries)
				.then(response => {
					dispatch(success(response.data));
				})
				.catch(error => {
					dispatch(failure(error.data));
				});
		};
	};
}

export type CountriesActions = typeof CountriesActions;