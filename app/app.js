require('./stylesheets/home.scss');

import React from 'react';
import { render } from 'react-dom';
import { Link, Route, Router } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createStore, renderDevTools } from './utils/devTools';

import ItineraryHandler from './containers/ItineraryContainer.js';
import ItineraryApp from './reducers/reducers';

let store = createStore(ItineraryApp,
	applyMiddleware(thunk)
);

let routes = (
	<div>
	<Provider store={store}>
	<Router>
		<Route name="todo" path="/" component={ItineraryHandler}/>
	</Router>
	</Provider>

	{renderDevTools(store)}
	</div>
);

render(routes, document.body);
