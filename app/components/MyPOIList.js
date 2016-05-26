import React, { Component, PropTypes } from 'react'
import { alternateClass, parsePOIType, openNow } from '../utils/POIHelpers';

export default class MyPOIList extends Component {
	render() {
		return (
			<div className="my-poi-list-wrapper">
			<div className="header">My Itinerary</div>
			<ul
				className="my-poi-list"
				onDragOver={(e) => this.handleDragOver(e)}
			>
				{this.props.MyPOIs.map((poi, i) =>
					<li
					className={alternateClass(i)}
					key={poi.place_id}
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

		this.props.onDragStart(e.currentTarget.dataset.index, 'MyPOI', this.props.MyPOIs[e.currentTarget.dataset.index])
	}

	handleDragEnd(e) {
		this.props.onDragEnd()
	}

	handleDragOver(e) {
		var targetEl = e.currentTarget
		var fromIndex = this.props.dragPOI.index;
		if ((targetEl.dataset.index || this.props.MyPOIs.length == 0)) {
			e.preventDefault();

			var toIndex = targetEl.dataset.index ? Number(targetEl.dataset.index) : 0;
			if((e.clientY - targetEl.offsetTop) > (targetEl.offsetHeight / 2))
				toIndex++

			if(fromIndex < toIndex)
				toIndex--

			if (targetEl.dataset.id != this.props.dragPOI.data.place_id) {
				console.log(this.props.MyPOIs)
			}
			this.props.onDragOver(this.props.dragPOI, {index: toIndex, listType: 'MyPOI'})
		}
	}
}

MyPOIList.propTypes = {
	/*POIs: PropTypes.arrayOf(PropTypes.shape({
		description: PropTypes.string.isRequired,
	}).isRequired).isRequired*/
}
