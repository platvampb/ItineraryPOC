import React, { Component, PropTypes } from 'react'
import POI from './POI'

export default class POIListContainer extends Component {

	render() {

		return (
			<div className="poi-list-wrapper">
			<div className="poi-list">
				{this.props.POIs.map((poi, i) =>
					<POI
						POI={poi}
						index={i}
						key={poi.place_id}
					/>
				)}
			</div>
			</div>
		)
	}

}

POIListContainer.propTypes = {
	POIs: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		place_id: PropTypes.string.isRequired,
		thumbnail_path: PropTypes.string,
		opening_hours: PropTypes.shape({
			open_now: PropTypes.boolean,
		}),
		types: PropTypes.arrayOf(PropTypes.string),
	}).isRequired).isRequired,
}
