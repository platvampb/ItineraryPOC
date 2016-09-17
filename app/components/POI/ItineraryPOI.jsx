import React, { Component, PropTypes } from 'react'
import POIImage from './POIImage'
import POIInfo from './POIInfo'

export default class ItineraryPOI extends Component {
	render() {
		const { poi } = this.props

		let imageOrHeader = () => {
			return (poi.photoUrls.length > 0) ? (
				<POIImage poi={poi}/>
			) : (
				<POIImage poi={poi}/>
			)
		}

		//FIX: dragging property gets lost when drag to a different day
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
	day: PropTypes.number.isRequired,
	poi: PropTypes.object.isRequired,
}
