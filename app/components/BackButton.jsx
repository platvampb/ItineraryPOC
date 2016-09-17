import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class POIHeader extends Component {
	render() {
		const { pathname } = this.props

		let displayClass = (pathname.indexOf('/itinerary') === 0) ? '' : ' hide'

		return (
			<Link
				className={"back-button" + displayClass}
				to="/"
			/>
		)
	}
}

POIHeader.propTypes = {
	pathname: PropTypes.string.isRequired,
}
