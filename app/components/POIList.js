import React, { Component, PropTypes } from 'react'
import POI from './POI'

export default class POIList extends Component {
	render() {
		return (
			<ul>
				{this.props.POIs.map(poi =>
					<POI
						key={poi.id}
						{...poi}
					/>
				)}
			</ul>
		)
	}
}

POIList.propTypes = {
	POIs: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
	}).isRequired).isRequired
}
