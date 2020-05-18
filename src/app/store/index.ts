import { 
	createStore, 
	combineReducers, 
	applyMiddleware, 
	Store } from 'redux';
import thunk from 'redux-thunk';
import { StatisticReducer } from './statistic/reducers';
import { StatisticsState } from './statistic/state';
import { CountriesReducer } from './countries/reducers';
import { CountriesState } from './countries/state';

export interface RootState {
	statistic: StatisticsState;
	countries: CountriesState;
}

export const configureStore = (initialState?: RootState): Store<RootState> => {
	const middleware = applyMiddleware(thunk); // <-- later check if production
	const rootReducer = combineReducers<RootState>({
		statistic: StatisticReducer as any,
		countries: CountriesReducer as any
	});

	const store = createStore(rootReducer, initialState as RootState, middleware);

	return store;
};

export * from './statistic/reducers';
export * from './countries/reducers';

// store.subscribe(() => console.log(store.getState().photography));
// // Dispatch some actions
// store.dispatch(getPhotos());