import * as React from 'react';
import * as style from './style.css';
import { Container } from 'semantic-ui-react';
import { StatisticsActions } from 'app/store/statistic/actions';
import { RootState } from 'app/store';
import { Models } from 'app/models';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export namespace HomePageComponent {
	export interface Props {
		countries: Models.Countries[];
		isLoading: boolean;
		actions: StatisticsActions;
	}
}

export const HomePageComponent: React.FC<HomePageComponent.Props> = (props: HomePageComponent.Props) => {
	return (
		<Container id={style.container}>
			<span>COVID19 TRACKER</span>
		</Container>
	);
};

const mapStateToProps = (state: RootState): Pick<HomePageComponent.Props, 'countries' | 'isLoading'> => {
	return {
		countries: state.statistic.countries,
		isLoading: state.statistic.isLoading
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<HomePageComponent.Props, 'actions'> => ({
	actions: bindActionCreators(StatisticsActions, dispatch)
});

const HomePageConnect = connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);
export { HomePageConnect as HomePage };