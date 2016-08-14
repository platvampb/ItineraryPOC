require('./stylesheets/home.scss')
require('./stylesheets/vendor/bootstrap/css/bootstrap.css')

import React from 'react'
import { render } from 'react-dom'
import { Route, Router } from 'react-router'

//redux stuff
import { Provider } from 'react-redux'
import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { createStore, renderDevTools } from './utils/devTools'

import AppHandler from './containers/AppContainer.js'
import ItineraryHandler from './containers/ItineraryContainer'
import CitySearchApp from './reducers'

let store = createStore(CitySearchApp,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
)

let routes = (
	<div className="app">
	<Provider store={store}>
	<Router>
		<Route name="main" component={AppHandler}>
			<Route name="itinerary" path="/" component={ItineraryHandler}/>
		</Route>
	</Router>
	</Provider>

	{renderDevTools(store)}
	</div>
)

render(routes, document.body)
