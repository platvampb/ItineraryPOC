import React, { Component, PropTypes } from 'react'
import TimeButton from './TimeButton'
import Timeline from './Timeline'

export default class POIInfo extends Component {
	render() {
		const { poi } = this.props

		//FIX: dragging property gets lost when drag to a different day
		let hours = poi.poi.hoursOfVisit > 1 ? 'hours' : 'hour'
		return (
			<div className="poi-info-wrapper">
				<div className="poi-info">
				<div className="poi-info-left">
					<p className="cost">Visit for:<br/>{poi.poi.hoursOfVisit} {hours}</p>
				</div>
				<div className="poi-info-right">
					{poi.poi.description}
				</div>
				</div>
			</div>
		)
	}
}

POIInfo.propTypes = {
	poi: PropTypes.object.isRequired,
}
