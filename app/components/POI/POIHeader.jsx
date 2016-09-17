import React, { Component, PropTypes } from 'react'
import FadeInImage from './FadeInImage'

export default class POIHeader extends Component {
	render() {
		const { poi } = this.props

		return (
			<div className="poi-photo-wrapper">
				<div className="poi-photo-filter"/>
				<h3 className="poi-name">{poi.poi.name}</h3>
			</div>
		)
	}
}

POIHeader.propTypes = {
	poi: PropTypes.object.isRequired,
}
