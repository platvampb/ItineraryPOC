import React, { Component, PropTypes } from 'react'
import SimpleLayer from './SimpleLayer'

export default class UserMenu extends Component {
	constructor(props) {
		super(props)
		this.state = {
			actions: [
				{
					type: 'logout',
					display: 'Sign out',
					handler: 'logoutHandler',
				},
			],
		}
	}
	render() {
		const { visible, hideMenu } = this.props

		let hideClass = (() => {
			if (!visible)
				return 'hidden'

			return ''
		})()

		return (
			<div className={"user-action-menu " + hideClass}>
				<ul>
					{this.state.actions.map((action, i) =>
						<li
							key={i}
							onClick={this.props[action.handler]}
						>
						{action.display}
						</li>
					)}
				</ul>
				<SimpleLayer
					className={"menu-layer " + hideClass}
					onClick={hideMenu}
				/>
			</div>
		)
	}
}

UserMenu.propTypes = {
	visible: PropTypes.bool.isRequired,
	hideMenu: PropTypes.func.isRequired,
	logoutHandler: PropTypes.func.isRequired,
}
