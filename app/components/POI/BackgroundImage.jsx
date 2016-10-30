import React, { Component, PropTypes } from 'react'
import { getImageUrl } from '../../utils/POIHelpers'

export default class BackgroundImage extends Component {
	render() {
		const { poi } = this.props

		let getBackgroundImage = (poi) => {
			return {
				backgroundImage: 'url(' + getImageUrl(poi.poi) + ')',
			}
		}
		/*
		return (
			<img className="itinerary-poi-background" src={'http://127.0.0.1:3000/' + poi.photo_url}/>
		)*/
		return (
			<div className="itinerary-poi-background"
			style={getBackgroundImage(poi)}
			/>
		)
	}
}

BackgroundImage.propTypes = {
	poi: PropTypes.object.isRequired,
}
