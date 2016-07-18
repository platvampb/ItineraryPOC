import React, { Component, PropTypes } from 'react'
import { parsePOIType, openNow } from '../../utils/POIHelpers';

export default class POI extends Component {

	render() {
		const { POI, index } = this.props

		let divStyle = (thumbnail) => {
			return thumbnail ? {
				backgroundImage: 'url(' + 'http://127.0.0.1:3000/' + thumbnail + ')',
			} : {}
		}

		let POIImage = (thumbnail) => {
			return thumbnail ? (
				<img src={'http://127.0.0.1:3000/' + POI.thumbnail_path}/>
			) : ''
		}

		return (
				<div className="poi-wrapper">
				<div
				data-id={POI.place_id}
				data-index={index}
				/*style={divStyle(POI.thumbnail_path)}*/
				className="poi"
				>
					<p className="poi-image">{POIImage(POI.thumbnail_path)}</p>
					<p className="poi-name">{POI.name}</p>
					<p className="poi-details">
						<span className="poi-type">{parsePOIType(POI)}</span>
						<span className={"opening " + (openNow(POI) ? 'open-now': 'closed')}>
							{openNow(POI) ? 'Open': 'Closed'}
						</span>
					</p>
				</div>
				</div>
		)
	}
}

POI.propTypes = {
	POI: PropTypes.shape({
		name: PropTypes.string.isRequired,
		place_id: PropTypes.string.isRequired,
		thumbnail_path: PropTypes.string,
		opening_hours: PropTypes.shape({
			open_now: PropTypes.boolean,
		}),
		types: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
	index: PropTypes.number.isRequired,
}
