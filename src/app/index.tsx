import * as React from 'react';
import { Statistic, Countries } from 'app/components';

export const App: React.FC = () => {

	return (
		<React.Fragment>
			<Statistic />
			<Countries />
		</React.Fragment>
	);
};