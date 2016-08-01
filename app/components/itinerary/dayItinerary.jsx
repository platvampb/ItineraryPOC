import React, { Component, PropTypes } from 'react'
import ItineraryPOI from './itineraryPOI'

export default class DayItinerary extends Component {
	render() {
		const { activeDay, dayItinerary } = this.props
		return (
			<div className="tab-content">
			<div className="tab-pane active">
			{dayItinerary.map(poi =>
				<ItineraryPOI
					key={poi.poi.id}
					activeDay={activeDay}
					poi={poi.poi}
				/>
			)}
			</div>
			</div>
		)
	}
}

DayItinerary.propTypes = {
	activeDay: PropTypes.number.isRequired,
	dayItinerary: PropTypes.array.isRequired,
}
