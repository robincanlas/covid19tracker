import * as React from 'react';
// import { Statistic, Countries, Chart } from 'app/components';
import { Map } from 'app/components';

export const App: React.FC = () => {
	
	return (
		<React.Fragment>
			<Map />
			{/* <Statistic />
			<Countries />
			<Chart /> */}
		</React.Fragment>
	);
};