import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';
import { Provider } from 'react-redux';
import { configureStore } from 'app/store';

import 'normalize.css';
import './default.css';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);