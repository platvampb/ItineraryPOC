import React, { Component } from 'react'
import { homeApi } from '../../config/config'

export default class LoginButton extends Component {
	render() {
		return (
			<a
				className="user-button nav-button login-button"
				href={ homeApi.baseUrl
					+ homeApi.signIn
					+ '?callback='
					+ window.location.href }
			>
				<i className="glyphicon glyphicon-log-in"/>
				<div className="icon-text">Sign in</div>
			</a>
		)
	}
}
