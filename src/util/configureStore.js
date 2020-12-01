import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/reducer';
import userMiddleware from '../middleware/userMiddleware'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore(initialState, middleware) {
	const allMiddleware = [thunk, userMiddleware].concat(middleware||[]);

	const state = initialState || {};

	const store = createStore(reducer, state, composeEnhancers(applyMiddleware(...allMiddleware)));

	return store;
}