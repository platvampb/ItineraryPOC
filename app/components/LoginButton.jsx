import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export default class LoginButton extends Component {
	render() {
		return (
			<a className="user-button nav-button login-button">
				<i className="glyphicon glyphicon-log-in"/>
				<div className="icon-text">Sign in</div>
			</a>
		)
	}
}
