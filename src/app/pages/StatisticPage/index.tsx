import * as React from 'react';
import * as style from './style.css';
import { Container, Card } from 'semantic-ui-react';
import { StatisticsActions } from 'app/store/statistic/actions';
import { RootState } from 'app/store';
import { Models } from 'app/models';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CountUp from 'react-countup';

export namespace StatisticPageComponent {
	export interface Props {
		statistics?: Models.Statistics[];
		isLoading?: boolean;
		actions?: StatisticsActions;
	}
}

const StatisticPageComponent: React.FC<StatisticPageComponent.Props> = ({ statistics = [], isLoading = true, actions = StatisticsActions }: StatisticPageComponent.Props) => {
	React.useEffect(() => {
		actions.getStats();
	}, []);
	
	if (isLoading) {
		return <span>Loading...</span>;
	}

	return (
		<Container id={style.container}>
			<div className={style.title}>COVID-19 TRACKER</div>
			<div className={style.grid}>
				{statistics.map(element => (
					<Card className={style[element.name]} fluid key={element.name}>
						<Card.Content>
							<Card.Meta className={style.header}>{element.name}</Card.Meta>
							<Card.Header>
								<CountUp 
								start={0} 
								end={element.value}
								duration={2.5}
								separator=',' />
							</Card.Header>
							<Card.Description>
								{`Number of ${element.name} ${element.name === 'deaths' ? 'from' : 'cases from' } COVID-19`}
							</Card.Description>
						</Card.Content>
					</Card>
				))}
			</div>
		</Container>
	);
};

const mapStateToProps = (state: RootState): Pick<StatisticPageComponent.Props, 'statistics' | 'isLoading'> => {
	return {
		statistics: state.statistic.statistics,
		isLoading: state.statistic.isLoading
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<StatisticPageComponent.Props, 'actions'> => ({
	actions: bindActionCreators(StatisticsActions, dispatch)
});

const StatisticPageConnect = connect(mapStateToProps, mapDispatchToProps)(StatisticPageComponent);
export { StatisticPageConnect as StatisticPage };