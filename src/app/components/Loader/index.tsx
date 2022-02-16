import * as React from 'react';
import * as style from './style.css';

export const Loader: React.FC = () => {
	return (
		<span id={style.loading}>
			{/* <div className={style.title}>
				<p>Covid-19 Updates</p>
			</div> */}
			<div className={style['sk-cube-grid']}>
				<div className={`${style['sk-cube']} ${style['sk-cube1']}`}></div>
				<div className={`${style['sk-cube']} ${style['sk-cube2']}`}></div>
				<div className={`${style['sk-cube']} ${style['sk-cube3']}`}></div>
				<div className={`${style['sk-cube']} ${style['sk-cube4']}`}></div>
				<div className={`${style['sk-cube']} ${style['sk-cube5']}`}></div>
				<div className={`${style['sk-cube']} ${style['sk-cube6']}`}></div>
				<div className={`${style['sk-cube']} ${style['sk-cube7']}`}></div>
				<div className={`${style['sk-cube']} ${style['sk-cube8']}`}></div>
				<div className={`${style['sk-cube']} ${style['sk-cube9']}`}></div>
			</div>	
			<div className={style.copyright}>
				<p>© 2020, Coded by Kristoffer Robin Canlas</p>
			</div>
		</span>
	);
};