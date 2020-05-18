import * as React from 'react';
import * as style from './style.css';
import { Container } from 'semantic-ui-react';

export const Chart: React.FC = () => {
	return (
		<Container id={style.container}>
			<span>Chartss</span>
		</Container>
	);
}