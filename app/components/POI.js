import React, { Component, PropTypes } from 'react'
import { alternateClass, parsePOIType, openNow } from '../utils/POIHelpers';

export default class POI extends Component {

	render() {
		const { dispatch, POI, listType, index, dragPOI } = this.props

		let divStyle = (thumbnail) => {
			return thumbnail ? {
				backgroundImage: 'url(' + 'http://127.0.0.1:3000/' + thumbnail + ')'
			} : {}
		}

		return (
				<li
				className={alternateClass(index)}
				data-id={POI.place_id}
				data-index={index}
				draggable="true"
				onDragEnd={(e) => this.handleDragEnd(e)}
				onDragStart={(e) => this.handleDragStart(e, POI)}
				onDragOver={(e) => this.handleDragOver(e)}
				style={divStyle(POI.thumbnail_path)}
				>
					<p className="poi-name">{POI.name}</p>
					<p className="poi-details">
						<span className="poi-type">{parsePOIType(POI)}</span>
						<span className={"opening " + (openNow(POI) ? 'open-now': 'closed')}>{openNow(POI) ? 'Open': 'Closed'}</span>
					</p>
				</li>
		)
	}

	handleDragStart(e, POI) {
		// Firefox requires calling dataTransfer.setData
		// for the drag to properly work
		e.dataTransfer.setData("text/html", null)

		e.dataTransfer.effectAllowed = 'move'

		this.props.onDragStart(e.currentTarget.dataset.index, this.props.listType, POI)
	}

	handleDragEnd(e) {
		this.props.onDragEnd()
	}

	handleDragOver(e) {
		var targetEl = e.currentTarget
		var fromIndex = this.props.dragPOI.index;
		if (targetEl.dataset.id != this.props.dragPOI.data.place_id) {
			e.preventDefault();

			var toIndex = targetEl.dataset.index ? Number(targetEl.dataset.index) : 0;
			if((e.clientY - targetEl.offsetTop) > (targetEl.offsetHeight / 2))
				toIndex++

			if(fromIndex < toIndex)
				toIndex--

			this.props.onDragOver(this.props.dragPOI, {index: toIndex, listType: this.props.listType})
		}
	}
}

POI.propTypes = {
	/*POIs: PropTypes.arrayOf(PropTypes.shape({
		description: PropTypes.string.isRequired,
	}).isRequired).isRequired*/
}
