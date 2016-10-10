import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/userActions'

import LoginButton from './LoginButton'
import AvatarButton from './AvatarButton'
import UserMenu from './UserMenu'

class UserNavContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			displayMenu: false,
		}
	}
	render() {
		const { dispatch, user } = this.props
		if (!user.loggedIn)
			return (
				<LoginButton/>
			)

		return (
			<div className="user-nav">
				<AvatarButton
					toggleMenu={this.toggleMenu.bind(this)}
					showHideMenu={this.showHideMenu.bind(this)}
				/>
				<UserMenu
					visible={this.state.displayMenu}
					logoutHandler={this.logout.bind(this)}
					hideMenu={this.showHideMenu.bind(this, false)}
				/>
			</div>
		)
	}

	logout() {
		this.props.dispatch(logout())
	}

	toggleMenu() {
		this.showHideMenu(!this.state.displayMenu)
	}

	showHideMenu(show) {
		this.setState({
			displayMenu: show,
		})
	}
}

function select(state) {
	return {
		user: state.user,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(UserNavContainer)
