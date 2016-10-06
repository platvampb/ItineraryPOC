import React, { Component, PropTypes } from 'react'

export default class LoginButton extends Component {
	render() {
		return (
			<a className="user-button nav-button avatar-button">
				<i className="glyphicon glyphicon-user"/>
				<div className="icon-text">Derp</div>
			</a>
		)
	}
}
