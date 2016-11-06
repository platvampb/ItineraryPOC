import React, { Component, PropTypes } from 'react'
import { getImageUrl } from '../../utils/POIHelpers'

export default class BackgroundImage extends Component {
	render() {
		const { poi } = this.props

		let getBackgroundImage = (poi) => {
			if (poi.poi.photoUrls.length > 0)
				return {
					backgroundImage: 'url(' + getImageUrl(poi.poi) + ')',
				}

			return {}
		}

		return (
			<div className="poi-bar-background"
				style={getBackgroundImage(poi)}
			/>
		)
	}
}

BackgroundImage.propTypes = {
	poi: PropTypes.object.isRequired,
}
