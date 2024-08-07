import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app';
import './styles.css';
import { rootReducer } from './services/reducers';
import {
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
} from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

// @ts-ignore
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

// @ts-ignore
const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
