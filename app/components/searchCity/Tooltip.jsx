require('../../stylesheets/tooltip.scss')

import React, { Component, PropTypes } from 'react'

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

Tooltip.propTypes = {
	message: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired,
}
