import React from 'react';
import {
	createStore,
	applyMiddleware
} from 'redux';
import {
	Provider
} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import {
	createBrowserHistory
} from 'history';
import reducers from './reducers';
import saga from './sagas';

import Home from './components/pages/Home';
import RestaurantHome from './components/pages/RestaurantHome';
import 'react-select/dist/react-select.css';
import './index.scss';

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const history = createBrowserHistory({});
sagaMiddleware.run(saga);

export default class Root extends React.PureComponent {
	render() {
		return (
			<Provider store={store}>
		        <Router history={history}>
		        <Switch>
			          <Route exact path='/' component={Home} />
			          <Route path="/restaurants" component={RestaurantHome} />
		        </Switch>
		        </Router>
		    </Provider>
		);
	}
}