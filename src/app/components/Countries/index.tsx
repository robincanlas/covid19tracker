import * as React from 'react';
import * as style from './style.css';
import { Container, Dropdown, DropdownProps } from 'semantic-ui-react';
import { RootState } from 'app/store';
import { bindActionCreators, Dispatch } from 'redux';
import { StatisticsActions } from 'app/store/statistic/actions';
import { connect } from 'react-redux';
import { Models } from 'app/models';
import { CountriesActions } from 'app/store/countries/actions';
import { endPoint } from 'app/constants';

export namespace CountryDropdown {
	export interface Props {
		list?: Models.Countries[];
		isLoading?: boolean;
		statsActions?: StatisticsActions;
		countriesActions?: CountriesActions;
	}
}

const CountryDropdown: React.FC<CountryDropdown.Props> = ({ 
	list = [], 
	isLoading = true, 
	statsActions = StatisticsActions, 
	countriesActions = CountriesActions }: CountryDropdown.Props) => {
	
	React.useEffect(() => {
		countriesActions.getCountries();
	}, []);

	const changeCountry = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
		let url: string = data.value === 'Global' ? endPoint.url : `${endPoint.countries}${data.value}`;
		statsActions.getStats(url, data.value as string);
	};

	return (
		<Container id={style.container}>
			<Dropdown 
				className={style.dropdown}
				fluid
				search
				selection
				defaultValue='Global'
				onChange={changeCountry}
				options={list} />
		</Container>
	);
};

const mapStateToProps = (state: RootState): Pick<CountryDropdown.Props, 'list' | 'isLoading'> => {
	return {
		list: state.countries.list,
		isLoading: state.countries.isLoading
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<CountryDropdown.Props, 'statsActions' | 'countriesActions'> => ({
	statsActions: bindActionCreators(StatisticsActions, dispatch),
	countriesActions: bindActionCreators(CountriesActions, dispatch)
});

const CountryConnect = connect(mapStateToProps, mapDispatchToProps)(CountryDropdown);
export { CountryConnect as Countries };