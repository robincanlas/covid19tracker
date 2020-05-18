import * as React from 'react';
import * as style from './style.css';
import { Container, Card } from 'semantic-ui-react';
import { StatisticsActions } from 'app/store/statistic/actions';
import { RootState } from 'app/store';
import { Models } from 'app/models';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CountUp from 'react-countup';
import { endPoint } from 'app/constants';

export namespace StatisticComponent {
	export interface Props {
		statistics?: Models.Statistics[];
		isLoading?: boolean;
		actions?: StatisticsActions;
	}
}

const StatisticComponent: React.FC<StatisticComponent.Props> = ({ statistics = [], isLoading = true, actions = StatisticsActions }: StatisticComponent.Props) => {
	React.useEffect(() => {
		actions.getStats(endPoint.url);
	}, []);

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
								duration={2}
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

const mapStateToProps = (state: RootState): Pick<StatisticComponent.Props, 'statistics' | 'isLoading'> => {
	return {
		statistics: state.statistic.statistics,
		isLoading: state.statistic.isLoading
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<StatisticComponent.Props, 'actions'> => ({
	actions: bindActionCreators(StatisticsActions, dispatch)
});

const StatisticConnect = connect(mapStateToProps, mapDispatchToProps)(StatisticComponent);
export { StatisticConnect as Statistic };