import './styles.css';
import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import { rootReducer } from './services/reducers';
import { App } from './components/app';
import {
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
} from 'redux';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

// @ts-ignore
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

root.render(
	<StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</StrictMode>
);
