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
import { wsMiddleware } from './services/ws-middleware';
import { feedWsActions } from './services/actions/feed-ws';
import { ordersWsActions } from './services/actions/orders-ws';

type ReduxDevToolsCompose = typeof compose;
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: ReduxDevToolsCompose;
	}
}
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(
			thunk,
			wsMiddleware(feedWsActions),
			wsMiddleware(ordersWsActions, true)
		)
	)
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
