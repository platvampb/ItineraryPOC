require('./stylesheets/home.scss');
require('./stylesheets/vendor/bootstrap/css/bootstrap.css');

import React from 'react';
import { render } from 'react-dom';
import { Link, Route, Router } from 'react-router';

//redux stuff
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { createStore, renderDevTools } from './utils/devTools';

import AppHandler from './containers/AppContainer.js';
import ItineraryHandler from './containers/ItineraryContainer.js';
import CitySearchHandler from './containers/CitySearchContainer.js';
import CitySearchApp from './reducers/reducers';

let store = createStore(CitySearchApp,
	applyMiddleware(thunk)
);

let routes = (
	<div className="app">
	<Provider store={store}>
	<Router>
		<Route name="main" component={AppHandler}>
			<Route name="search" path="/" component={CitySearchHandler}/>
			<Route name="itinerary" path="/places" component={ItineraryHandler}/>
		</Route>
	</Router>
	</Provider>

	{renderDevTools(store)}
	</div>
);

render(routes, document.body);
