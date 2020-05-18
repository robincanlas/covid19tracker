import { 
	createStore, 
	combineReducers, 
	applyMiddleware, 
	Store } from 'redux';
import thunk from 'redux-thunk';
import { StatisticReducer } from './statistic/reducers';
import { StatisticsState } from './statistic/state';

export interface RootState {
	statistic: StatisticsState;
}

export const configureStore = (initialState?: RootState): Store<RootState> => {
	const middleware = applyMiddleware(thunk); // <-- later check if production
	const rootReducer = combineReducers<RootState>({
		statistic: StatisticReducer as any,
	});

	const store = createStore(rootReducer, initialState as RootState, middleware);

	return store;
};

export * from './statistic/reducers';

// store.subscribe(() => console.log(store.getState().photography));
// // Dispatch some actions
// store.dispatch(getPhotos());