require('./stylesheets/home.scss');

import React from 'react';
import { render } from 'react-dom';
import { Link, Route, Router } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, renderDevTools } from './utils/devTools';

import TodoHandler from './containers/TodoApp.js';
import todoApp from './reducers/reducers';

let store = createStore(todoApp);

let App = React.createClass({
	render: function() {
		return (
			<div className="nav">
			<Link to="app">Home</Link>
			<Link to="todo">Todo</Link>

			{this.props.children}
			</div>
		);
	}
});

let routes = (
	<div>
	<Provider store={store}>
	<Router>
		<Route name="app" path="/" component={App}>
			<Route name="todo" path="/todo" component={TodoHandler}/>
		</Route>
	</Router>
	</Provider>

	{renderDevTools(store)}
	</div>
);

render(routes, document.body);
