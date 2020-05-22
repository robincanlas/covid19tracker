import React, { useState, useEffect } from 'react';
import * as style from './style.css';
import { Map, Statistic, Countries, Chart } from 'app/components';
import { Icon } from 'semantic-ui-react';

export const App: React.FC = () => {
	const [sidebar, setSidebar] = useState(false);

	useEffect(() => {
		// effect;

	}, [sidebar]);

	return (
		<React.Fragment>
			<span className={`${style.settings} ${sidebar ? style.hide : ''}`} onClick={() => setSidebar(true)}>
				<Icon name='settings' />
			</span>
			<Map />
			<div className={`${style.stats} ${sidebar ? style.show : ''}`}>
				<span className={style.settings} onClick={() => setSidebar(false)}>
					<Icon name='angle double left' />
				</span>
				<Statistic />
				<Countries />
				<Chart />
			</div>
		</React.Fragment>
	);
};