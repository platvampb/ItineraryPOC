import React, { Component, PropTypes } from 'react'
import TimeButton from './TimeButton'
import Timeline from './Timeline'

export default class POIInfo extends Component {
	render() {
		const { poi } = this.props

		//FIX: dragging property gets lost when drag to a different day
		return (
			<div className="poi-info-wrapper">
				<Timeline/>
				<div className="poi-info">
				<div className="poi-info-left">
					<div className="start-time-wrapper">
						<TimeButton/>
						<span className="start-time">11:30 am</span>
					</div>
					<p className="cost">cost: $20</p>
				</div>
				<div className="poi-info-right">
					The Pier offers Pacific Park, a full service amusement park, combined with plenty of restaurants, bars, and souvenir shops, as well as an entertaining arcade with more than 200 games. Pacific Park’s solar-powered Ferris wheel makes it the only one of its kind in the region. By day, marvel at the historic Looff Hippodrome Carousel, check out the street performers, or snag a stick of puffy cotton candy.
				</div>
				</div>
			</div>
		)
	}
}

POIInfo.propTypes = {
	poi: PropTypes.object.isRequired,
}
