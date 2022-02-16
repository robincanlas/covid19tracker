import * as React from 'react';
import * as style from './style.css';
import { Map, Statistic, Countries, Chart, Loader } from 'app/components';
import { Icon } from 'semantic-ui-react';

export const App: React.FC = () => {
	const [sidebar, setSidebar] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);
	const sidebarRef = React.useRef<HTMLDivElement | null>(null);

	const handleMousedown = (e: MouseEvent) => {
		if (sidebar && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
			setSidebar(false);
		}
	};

	React.useEffect(() => {
		// effect;
		document.addEventListener('mousedown', handleMousedown);
		return() => {
			document.removeEventListener('mousedown', handleMousedown);
		};
	}, [sidebarRef, sidebar]);

	const mapIsLoaded = () => {
		setIsLoading(false);
	};

	return (
		<React.Fragment>
			{isLoading && <Loader />}
			<span className={`${style.settings} ${sidebar ? style.hide : ''}`} onClick={() => setSidebar(true)}>
				<Icon name='settings' />
			</span>
			<Map mapIsLoaded={mapIsLoaded} />
			<div ref={sidebarRef} className={`${style.stats} ${sidebar ? style.show : ''}`}>
				<span className={style.settings} onClick={() => setSidebar(false)}>
					<Icon name='angle double up' />
				</span>
				<Statistic />
				<Countries />
				<Chart />
				<div className={style.copyright}>
					<p>© 2020, Coded by Kristoffer Robin Canlas</p>
				</div>
			</div>
		</React.Fragment>
	);
};