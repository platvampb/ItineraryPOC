import React, { Component, PropTypes } from 'react'

export default class ItineraryPOI extends Component {
	render() {
		const { activeDay, poi } = this.props

		return (
			<div className="itinerary-poi">
			{poi.name}
			</div>
		)
	}
}

ItineraryPOI.propTypes = {
	activeDay: PropTypes.number.isRequired,
	poi: PropTypes.object.isRequired,
}
