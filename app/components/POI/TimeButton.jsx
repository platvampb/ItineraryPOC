import React, { Component, PropTypes } from 'react'

export default class TimeButton extends Component {
	render() {
		const { poi } = this.props

		return (
			<div className="itinerary-poi-time-button">
			</div>
		)
	}
}

TimeButton.propTypes = {
	poi: PropTypes.object.isRequired,
}
