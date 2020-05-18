import { initialState, CountriesState } from '../state';
import { Models } from 'app/models';
import { handleActions } from 'redux-actions';
import { ActionTypes } from 'app/constants';

type Payload = Models.Countries[] | string | any | { name: string; iso2: string; iso3: string; };

export const CountriesReducer = handleActions<CountriesState | Payload, Payload> (
	{
		[ActionTypes.GET_COUNTRIES_REQUEST]: (state, action) => {
			return {
				...state,
				isLoading: true
			};
		},
		[ActionTypes.GET_COUNTRIES_SUCCESS]: (state, action) => {
			const list: Models.Countries[] = initialState.list;
			action.payload.countries.forEach((element: Payload) => {
				list.push({
					text: element.name,
					key: element.name,
					value: element.name
				});
			});
			return {
				...state,
				isLoading: false,
				list: list
			};
		},
		[ActionTypes.GET_COUNTRIES_FAILED]: (state, action) => {
			return {
				...state,
				isLoading: false,
				error: 'Error Fetching'
			};
		}
	},
	initialState
);