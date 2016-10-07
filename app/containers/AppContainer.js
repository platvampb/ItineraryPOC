import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import { authUser } from '../utils/loginHelpers'
import { login, logout } from '../actions/userActions'

import BackButton from '../components/BackButton'
import UserNavContainer from '../components/UserNavContainer'

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
			<div className="top-nav row">
				<div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
					<BackButton
						pathname={this.props.location.pathname}
					/>
					<UserNavContainer/>
					<div className="header">
						<img src="https://www.wewherego.com/img/logo/logo_wherego.png"/>
						<h1>{this.props.pageHeader}</h1>
					</div>
				</div>
			</div>
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
		pageHeader: state.pageHeader,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(AppHandler)
