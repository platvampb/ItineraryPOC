import React, { Component, PropTypes } from 'react'
import { alternateClass, parsePOIType, openNow } from '../utils/POIHelpers';

export default class POI extends Component {

	render() {
		const { POI, index } = this.props

		let divStyle = (thumbnail) => {
			return thumbnail ? {
				backgroundImage: 'url(' + 'http://127.0.0.1:3000/' + thumbnail + ')',
			} : {}
		}

		return (
				<li
				className={alternateClass(index)}
				data-id={POI.place_id}
				data-index={index}
				draggable="true"
				onDragEnd={(e) => this.handleDragEnd(e)}
				onDragStart={(e) => this.handleDragStart(e)}
				onDragOver={(e) => this.handleDragOver(e)}
				style={divStyle(POI.thumbnail_path)}
				>
					<p className="poi-name">{POI.name}</p>
					<p className="poi-details">
						<span className="poi-type">{parsePOIType(POI)}</span>
						<span className={"opening " + (openNow(POI) ? 'open-now': 'closed')}>
							{openNow(POI) ? 'Open': 'Closed'}
						</span>
					</p>
				</li>
		)
	}

	handleDragStart(e) {
		// Firefox requires calling dataTransfer.setData
		// for the drag to properly work
		e.dataTransfer.setData("text/html", null)

		e.dataTransfer.effectAllowed = 'move'

		this.props.onDragStart(e.currentTarget.dataset.index, this.props.listType, this.props.POI)
	}

	handleDragEnd(e) {
		this.props.onDragEnd()
	}

	handleDragOver(e) {
		var targetEl = e.currentTarget
		var fromIndex = this.props.dragPOI.index;
		if (targetEl.dataset.id !== this.props.dragPOI.data.place_id) {
			e.preventDefault();

			let toIndex = targetEl.dataset.index ? Number(targetEl.dataset.index) : 0
			if((e.clientY - targetEl.offsetTop) > (targetEl.offsetHeight / 2))
				toIndex++

			if(fromIndex < toIndex)
				toIndex--

			this.props.onDragOver(this.props.dragPOI, {index: toIndex, listType: this.props.listType})
		}
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
	listType: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	onDragStart: PropTypes.func.isRequired,
	onDragOver: PropTypes.func.isRequired,
	onDragEnd: PropTypes.func.isRequired,
}
