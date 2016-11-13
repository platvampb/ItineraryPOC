import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import { authUser } from '../utils/loginHelpers'
import { login, logout } from '../actions/userActions'

import TopNavContainer from './TopNavContainer'

class AppHandler extends Component {
	componentWillMount() {
		authUser(this.authSuccess.bind(this), this.authFail.bind(this))
	}

	authSuccess(profile) {
		this.props.dispatch(login(profile))
	}

	authFail() {
		this.props.dispatch(logout())
	}

	render() {
		return (
			<div className="app-container">
			<TopNavContainer
				curPage={this.props.location.pathname}
			/>
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
