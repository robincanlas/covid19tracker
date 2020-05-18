import * as React from 'react';
import { App } from '../app';
import { shallow } from 'enzyme';

describe('App', () => {
	it('should render the App component', () => {
		const AppComponent: any = shallow(<App />);
		expect(AppComponent).not.toBeNull();
	});
});