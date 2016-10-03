import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import LoginButton from './LoginButton'
import AvatarButton from './AvatarButton'

class UserNavContainer extends Component {
	render() {
		const { dispatch, user } = this.props
		if (!user.loggedIn)
			return (
				<LoginButton/>
			)

		return (
			<AvatarButton/>
		)
	}
}

function select(state) {
	return {
		user: state.user,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(UserNavContainer)
