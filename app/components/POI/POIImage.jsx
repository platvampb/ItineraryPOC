import React, { Component, PropTypes } from 'react'
import FadeInImage from './FadeInImage'
import { mallocApi } from '../../config/config.js'

export default class POIImage extends Component {
	render() {
		const { poi } = this.props

		let getImageUrl = (poi) => {
			return mallocApi.cdnUrl + "/" + poi.photoUrls[0].url
		}

		let photoOrName = () => {
			if (poi.poi.photoUrls.length > 0)
				return (
					<div className="poi-photo-wrapper">
						<div className="poi-photo-filter"/>
						<FadeInImage
							className="poi-photo"
							src={getImageUrl(poi.poi)}
						/>
						<h3 className="poi-name">{poi.poi.name}</h3>
					</div>
				)

			return (
				<div className="poi-header">
					<h3 className="poi-name">{poi.poi.name}</h3>
				</div>
			)
		}
		return (
			<div className="poi-photo-outer-wrapper">
				{photoOrName()}
			</div>
		)
	}
}

POIImage.propTypes = {
	poi: PropTypes.object.isRequired,
}
