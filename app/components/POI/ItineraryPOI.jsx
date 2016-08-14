import React, { Component, PropTypes } from 'react'
import BackgroundImage from './BackgroundImage'
import TimeButton from './TimeButton'

export default class ItineraryPOI extends Component {
	render() {
		const { poi } = this.props

		//FIX: dragging property gets lost when drag to a different day
		return (
			<div className="itinerary-poi-wrapper">
			<div className="itinerary-poi">
				<BackgroundImage poi={poi}/>
				<h3 className="poi-name">{poi.poi.name}</h3>
				<div className="start-time-wrapper">
					<TimeButton poi={poi}/>
					<span className="start-time">11:30 am</span>
				</div>
				<p className="cost">cost: $20</p>
			</div>
			</div>
		)
	}
}

ItineraryPOI.propTypes = {
	day: PropTypes.number.isRequired,
	poi: PropTypes.object.isRequired,
}
