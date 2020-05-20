import * as React from 'react';
import * as style from './style.css';
import { Container } from 'semantic-ui-react';
import { Line, Bar } from 'react-chartjs-2';
import { RootState } from 'app/store';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ChartActions } from 'app/store/chart/actions';
import { Models } from 'app/models';

namespace Chart {
	export interface Props {
		dailyData?: any;
		isLoading?: boolean;
		statistics?: Models.Statistics[];
		country?: string;

		actions?: ChartActions;
	}
}

export const ChartComponent: React.FC<Chart.Props> = ({ 
	dailyData = [], 
	isLoading = true, 
	statistics = [], 
	country = 'Global', 
	actions = ChartActions 
}: Chart.Props) => {
	
	React.useEffect(() => {
		actions.getDaily();
	}, []);
	
	if (country === 'Global') {
		return (
			<Container id={style.container}>
				<Line
					data={{
						labels: dailyData.map(({ date }: { date: Date }) => date),
						datasets: [{
							data: dailyData.map((data: any) => data.confirmed),
							label: 'Infected',
							borderColor: '#59bcdc',
							backgroundColor: 'rgba(173, 216, 230, 0.5)',
							fill: true,
						}, {
							data: dailyData.map((data: any) => data.deaths),
							label: 'Deaths',
							borderColor: 'red',
							backgroundColor: 'rgba(255, 0, 0, 0.5)',
							fill: true,
						},
						],
					}}
				/>
			</Container>
		);
	} 

	return (
		<Container id={style.container}>
			{statistics.length > 0 &&
				<Bar
					data={{
						labels: ['Infected', 'Recovered', 'Deaths'],
						datasets: [
							{
								label: 'People',
								backgroundColor: ['rgba(173, 216, 230, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
								data: [statistics[0].value, statistics[1].value, statistics[2].value],
							},
						],
					}}
					options={{
						legend: { display: false },
						title: { display: true, text: `Current state in ${country}` },
					}}
				/>
			}
		</Container>
	);
};

const mapStateToProps = (state: RootState): Pick<Chart.Props, 'dailyData' | 'isLoading' | 'statistics' | 'country'> => {
	return {
		dailyData: state.chart.dailyData,
		isLoading: state.chart.isLoading,
		statistics: state.statistic.statistics,
		country: state.statistic.country
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<Chart.Props, 'actions'> => ({
	actions: bindActionCreators(ChartActions, dispatch),
});

const ChartConnect = connect(mapStateToProps, mapDispatchToProps)(ChartComponent);
export { ChartConnect as Chart };