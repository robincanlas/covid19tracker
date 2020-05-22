import * as React from 'react';
import * as style from './style.css';
import { Container, Dropdown, DropdownProps } from 'semantic-ui-react';
import { RootState } from 'app/store';
import { bindActionCreators, Dispatch } from 'redux';
import { StatisticsActions } from 'app/store/statistic/actions';
import { connect, useDispatch } from 'react-redux';
import { Models } from 'app/models';
import { CountriesActions } from 'app/store/countries/actions';
import { ActionTypes, Statistics } from 'app/constants';

export namespace CountryDropdown {
	export interface Props {
		list?: Models.Countries[];
		countriesPayload?: Models.CountriesPayload[];
		isLoading?: boolean;
		country?: string;

		statsActions?: StatisticsActions;
		countriesActions?: CountriesActions;
	}
}

const CountryDropdown: React.FC<CountryDropdown.Props> = ({ 
	list = [], 
	countriesPayload = [],
	isLoading = true, 
	country = 'Global',
	statsActions = StatisticsActions, 
	countriesActions = CountriesActions }: CountryDropdown.Props) => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		countriesActions.getCountries();
	}, []);

	const changeCountry = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
		if (data.value === 'Global') {
			dispatch({ type: ActionTypes.SET_GLOBAL_STATISTICS });
		} else {
			const { cases, recovered, deaths, updated }: any = countriesPayload.find(element => element.country === data.value);
			const statistics: Models.Statistics[] = [ 
				{ value: cases, name: Statistics.CONFIRMED }, 
				{ value: recovered, name: Statistics.RECOVERED }, 
				{ value: deaths, name: Statistics.DEATHS } ];
			dispatch({
				type: ActionTypes.SET_COUNTRY_STATISTICS,
				payload: {
					country: data.value,
					statistics: statistics,
					lastUpdate: new Date(updated).toDateString()
				}
			});
		}
	};

	return (
		<Container id={style.container}>
			<Dropdown 
				loading={isLoading}
				disabled={isLoading}
				className={style.dropdown}
				fluid
				search
				selection
				// defaultValue={country}
				value={country}
				onChange={changeCountry}
				options={list} />
		</Container>
	);
};

const mapStateToProps = (state: RootState): Pick<CountryDropdown.Props, 'list' | 'countriesPayload' | 'isLoading' | 'country'> => {
	return {
		list: state.countries.list,
		countriesPayload: state.countries.countriesPayload,
		isLoading: state.countries.isLoading,
		country: state.statistic.country
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<CountryDropdown.Props, 'statsActions' | 'countriesActions'> => ({
	statsActions: bindActionCreators(StatisticsActions, dispatch),
	countriesActions: bindActionCreators(CountriesActions, dispatch)
});

const CountryConnect = connect(mapStateToProps, mapDispatchToProps)(CountryDropdown);
export { CountryConnect as Countries };