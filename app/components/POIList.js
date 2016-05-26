import React, { Component, PropTypes } from 'react'
import { alternateClass, parsePOIType, openNow } from '../utils/POIHelpers';

export default class POIList extends Component {
	componentWillMount() {
		this.props.onLoad(this.props.selectedCity.description)
	}

	render() {

		return (
			<div className="poi-list-wrapper">
			<div className="header">Available Attractions</div>
			<ul className="poi-list">
				{this.props.POIs.map((poi, i) =>
					<li
					className={alternateClass(i)}
					key = {poi.place_id}
					data-id={poi.place_id}
					data-index={i}
					draggable="true"
					onDragEnd={(e) => this.handleDragEnd(e)}
					onDragStart={(e) => this.handleDragStart(e)}
					onDragOver={(e) => this.handleDragOver(e)}
					>
					<p className="poi-name">{poi.name}</p>
					<p className="poi-details">
						<span className="poi-type">{parsePOIType(poi)}</span>
						<span className={"opening " + (openNow(poi) ? 'open-now': 'closed')}>{openNow(poi) ? 'Open': 'Closed'}</span>
					</p>
					</li>
				)}
			</ul>
			</div>
		)
	}

	handleDragStart(e) {
		// Firefox requires calling dataTransfer.setData
		// for the drag to properly work
		e.dataTransfer.setData("text/html", null)

		e.dataTransfer.effectAllowed = 'move'

		this.props.onDragStart(e.currentTarget.dataset.index, 'POI', this.props.POIs[e.currentTarget.dataset.index])
	}

	handleDragEnd(e) {
		this.props.onDragEnd()
	}

	handleDragOver(e) {
		e.preventDefault();

		var targetEl = e.currentTarget
		var fromIndex = this.props.dragPOI;
		var toIndex = targetEl.dataset.index ? Number(targetEl.dataset.index) : 0;
		if((e.clientY - targetEl.offsetTop) > (targetEl.offsetHeight / 2))
			toIndex++

		if(fromIndex.index < toIndex)
			toIndex--

		this.props.onDragOver(this.props.dragPOI, {index: toIndex, listType: 'POI'})
	}
}

POIList.propTypes = {
	/*POIs: PropTypes.arrayOf(PropTypes.shape({
		description: PropTypes.string.isRequired,
	}).isRequired).isRequired*/
}
