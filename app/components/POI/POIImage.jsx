import React, { Component, PropTypes } from 'react'
import FadeInImage from './FadeInImage'

export default class POIImage extends Component {
	render() {
		const { poi } = this.props

		let getImageUrl = (poi) => {
			return 'http://127.0.0.1:3000/' + poi.photo_url
		}
		return (
			<div className="poi-photo-outer-wrapper">
				<div className="timeline"/>
			<div className="poi-photo-wrapper">
				<div className="poi-photo-filter"/>
				<FadeInImage
					className="poi-photo"
					src={getImageUrl(poi)}
				/>
				<h3 className="poi-name">{poi.poi.name}</h3>
			</div>
			</div>
		)
	}
}

POIImage.propTypes = {
	poi: PropTypes.object.isRequired,
}
