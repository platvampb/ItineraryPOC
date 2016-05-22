require('./stylesheets/home.scss');

import React from 'react';
import { render } from 'react-dom';
import { Link, Route, Router } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createStore, renderDevTools } from './utils/devTools';

import ItineraryHandler from './containers/ItineraryContainer.js';
import CitySearchHandler from './containers/CitySearchContainer.js';
import CitySearchApp from './reducers/reducers';

let store = createStore(CitySearchApp,
	applyMiddleware(thunk)
);

let routes = (
	<div>
	<Provider store={store}>
	<Router>
		<Route name="itinerary" path="/places" component={ItineraryHandler}/>
		<Route name="search" path="/" component={CitySearchHandler}/>
	</Router>
	</Provider>

	{renderDevTools(store)}
	</div>
);

render(routes, document.body);
