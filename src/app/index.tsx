import * as React from 'react';
import { Statistic, Countries, Chart } from 'app/components';

export const App: React.FC = () => {

	return (
		<React.Fragment>
			<Statistic />
			<Countries />
			<Chart />
		</React.Fragment>
	);
};