import React, { Component, PropTypes } from 'react'
import POIImage from './POIImage'
import POIInfo from './POIInfo'

export default class ItineraryPOI extends Component {
	render() {
		const { poi } = this.props

		return (
			<div className="itinerary-poi-wrapper">
			<div className="itinerary-poi">
				<POIImage poi={poi}/>
				<POIInfo poi={poi}/>
			</div>
			</div>
		)
	}
}

ItineraryPOI.propTypes = {
	poi: PropTypes.object.isRequired,
}
