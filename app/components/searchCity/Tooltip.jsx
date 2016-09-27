require('../../stylesheets/tooltip.scss')

import React, { Component } from 'react'

export default class Tooltip extends Component {
	render() {
		const { message, show } = this.props
		return (
			<div className={"tooltip" + (show ? " visible" : "")}>
			{message}
			</div>
		)
	}
}
