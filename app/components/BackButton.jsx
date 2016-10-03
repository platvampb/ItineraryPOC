import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class BackButton extends Component {
	render() {
		const { pathname } = this.props

		let displayClass = (pathname.indexOf('/itinerary') === 0) ? '' : ' hide'

		return (
			<Link
				className={"nav-button back-button" + displayClass}
				to="/"
			/>
		)
	}
}

BackButton.propTypes = {
	pathname: PropTypes.string.isRequired,
}
