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
			const list: any = initialState.list;
			action.payload.forEach((element: Payload) => {
				list.push({
					text: element.country,
					key: element.country,
					value: element.country,
					image: { avatar: false, src: element.countryInfo.flag },
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