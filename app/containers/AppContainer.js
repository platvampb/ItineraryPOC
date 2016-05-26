import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

export default class AppHandler extends Component {
	render() {
		// Injected by connect() call:
		return (
			<div className="app-container">
			<ReactCSSTransitionGroup
				transitionName="example"
				transitionEnterTimeout={1000}
				transitionLeaveTimeout={1000}
			>
				{React.cloneElement(this.props.children, {
					key: this.props.location.pathname
				})}
			</ReactCSSTransitionGroup>
			</div>
		)
	}
}

AppHandler.propTypes = {
	/*
	visibleTodos: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired
	}).isRequired).isRequired*/
}
