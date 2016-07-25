import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

export default class AppHandler extends Component {

	render() {
		return (
			<div className="app-container">
			<ReactCSSTransitionGroup
				transitionName="example"
				transitionEnterTimeout={1000}
				transitionLeaveTimeout={1000}
			>
				{React.cloneElement(this.props.children, {
					key: this.props.location.pathname,
				})}
			</ReactCSSTransitionGroup>
			</div>
		)
	}
}

function select(state) {
	return {
		selectedCity: state.selectedCity,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(AppHandler)
