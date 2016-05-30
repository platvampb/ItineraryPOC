import React, { Component, PropTypes } from 'react'
import { alternateClass, parsePOIType, openNow } from '../utils/POIHelpers'
import POI from '../components/POI'

export default class POIList extends Component {
	componentWillMount() {
		if (this.props.listType == 'POI')
			this.props.onLoad(this.props.selectedCity.description)
	}

	render() {
		let myPOIPrefix = (this.props.listType == 'MyPOI') ? 'my-' : ''
		let headerText = (this.props.listType == "MyPOI") ? 'My Wishlist' : 'Available Attractions'

		return (
			<div className={myPOIPrefix + "poi-list-wrapper"}>
			<div className="header">{headerText}</div>
			<ul
				className={myPOIPrefix + "poi-list"}
				onDragOver={(e) => this.handleDragOverList(e)}
			>
				{this.props.POIs.map((poi, i) =>
					<POI
						POI={poi}
						listType={this.props.listType}
						index={i}
						key={poi.place_id}
						dragPOI={this.props.dragPOI}
						onDragStart={this.props.onDragStart}
						onDragEnd={this.props.onDragEnd}
						onDragOver={this.props.onDragOver}
					/>
				)}
			</ul>
			</div>
		)
	}

	handleDragOverList(e) {
		var targetEl = e.currentTarget
		var fromIndex = this.props.dragPOI.index
		if (this.isNewPlace(this.props.dragPOI, this.props.POIs)) {
			e.preventDefault();
			this.props.onDragOver(this.props.dragPOI, {index: this.props.POIs.length, listType: this.props.listType})
		}
	}

	isNewPlace(POIEl, POIList) {
		for (let poi of POIList) {//TODO:look into babel polyfil this with Array.findIndex later
			if (poi.place_id == POIEl.data.place_id)
				return false
		}

		return true
	}
}

POIList.propTypes = {
	/*POIs: PropTypes.arrayOf(PropTypes.shape({
		description: PropTypes.string.isRequired,
	}).isRequired).isRequired*/
}
