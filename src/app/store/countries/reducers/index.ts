import { initialState, CountriesState } from '../state';
import { Models } from 'app/models';
import { handleActions } from 'redux-actions';
import { ActionTypes } from 'app/constants';

type Payload = Models.Countries[] | string | Models.CountriesPayload[];

export const CountriesReducer = handleActions<CountriesState, Payload> (
	{
		[ActionTypes.GET_COUNTRIES_REQUEST]: (state, action) => {
			return {
				...state as CountriesState,
				isLoading: true
			};
		},
		[ActionTypes.GET_COUNTRIES_SUCCESS]: (state, action) => {
			const list: any = initialState.list;
			const payload: Models.CountriesPayload[] = action.payload as Models.CountriesPayload[];
			payload.forEach((element: Models.CountriesPayload) => {
				list.push({
					text: element.country,
					key: element.country,
					value: element.country,
					image: { avatar: false, src: element.countryInfo.flag },
				});
			});
			return {
				...state as CountriesState,
				isLoading: false,
				list: list as Models.Countries[],
				countriesPayload: payload
			};
		},
		[ActionTypes.GET_COUNTRIES_FAILED]: (state, action) => {
			return {
				...state as CountriesState,
				isLoading: false,
				error: 'Error Fetching'
			};
		}
	},
	initialState
);