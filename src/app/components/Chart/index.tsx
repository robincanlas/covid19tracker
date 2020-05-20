import * as React from 'react';
import * as style from './style.css';
import { Container, Message } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import { RootState } from 'app/store';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ChartActions } from 'app/store/chart/actions';

namespace Chart {
	export interface Props {
		dailyData?: any;
		isLoading?: boolean;
		country?: string;
		error?: string;

		actions?: ChartActions;
	}
}

export const ChartComponent: React.FC<Chart.Props> = ({ 
	dailyData = [], 
	isLoading = true, 
	country = 'Global',
	error = '', 
	actions = ChartActions 
}: Chart.Props) => {

	React.useEffect(() => {
		if (country) {
			actions.getDaily(country);
		}
	}, [country]);
	
	if (error) {
		return (
			<Container id={style.container}>
				<Message negative className={style.error}>
					<Message.Header>No Historical Data.</Message.Header>
				</Message>
			</Container>
		);
	}

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
						data: dailyData.map((data: any) => data.recovered),
						label: 'Recovered',
						borderColor: 'rgb(53, 255, 3)',
						backgroundColor: 'rgba(53, 255, 3, 0.5)',
						fill: true,
					}, {
						data: dailyData.map((data: any) => data.deaths),
						label: 'Deaths',
						borderColor: 'red',
						backgroundColor: 'rgba(255, 0, 0, 0.5)',
						fill: true,
					}
					],
				}}					
				options={{
					title: { display: true, text: `Current state ${country === 'Global' ? 'of the World' : `in ${country}`}` },
					animation: {
						duration: 750,
						easing: 'easeOutCubic'
					},
				}}
			/>
		</Container>
	);
};

const mapStateToProps = (state: RootState): Pick<Chart.Props, 'dailyData' | 'isLoading' | 'country' | 'error'> => {
	return {
		dailyData: state.chart.dailyData,
		isLoading: state.chart.isLoading,
		country: state.statistic.country,
		error: state.chart.error
	};
};

const mapDispatchToProps = (dispatch: Dispatch): Pick<Chart.Props, 'actions'> => ({
	actions: bindActionCreators(ChartActions, dispatch),
});

const ChartConnect = connect(mapStateToProps, mapDispatchToProps)(ChartComponent);
export { ChartConnect as Chart };