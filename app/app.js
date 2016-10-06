require('./stylesheets/home.scss')
require('./stylesheets/vendor/bootstrap/css/bootstrap.css')

import React from 'react'
import { render } from 'react-dom'
import { Route, Router, hashHistory } from 'react-router'

//redux stuff
import { Provider } from 'react-redux'
import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { createStore, renderDevTools } from './utils/devTools'

import AppHandler from './containers/AppContainer.js'
import POIListHandler from './containers/POIListContainer'
import ItineraryHandler from './containers/ItineraryContainer'
import CitySearchHandler from './containers/CitySearchContainer'
import CityList from './components/searchCity/CityList'
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
	<Router history={hashHistory}>
		<Route name="main" component={AppHandler}>
			<Route name="search" path="/" component={CitySearchHandler}/>
			<Route name="poi" path="/places" component={POIListHandler}/>
			<Route name="itinerary" path="/itinerary/:tripId" component={ItineraryHandler}/>
		</Route>
	</Router>
	</Provider>

	{renderDevTools(store)}
	</div>
)

render(routes, document.body)
