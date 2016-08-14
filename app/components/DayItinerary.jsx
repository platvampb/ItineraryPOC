import React, { Component, PropTypes } from 'react'
import ItineraryPOI from './POI/ItineraryPOI'

export default class DayItinerary extends Component {
	render() {
		const { dayItinerary } = this.props
		return (
			<div className="tab-content">
			<div className="tab-pane active" ref="tabPane">
				<div className="timeline-wrapper">
					<div className="timeline"/>
				</div>
				{dayItinerary.map((poi, i) =>
					<ItineraryPOI
						key={poi.poi.id}
						poi={poi}
						day={poi.day}
					/>
				)}
			</div>
			</div>
		)
	}
}

DayItinerary.propTypes = {
	dayItinerary: PropTypes.array.isRequired,
}
