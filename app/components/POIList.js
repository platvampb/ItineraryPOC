import React, { Component, PropTypes } from 'react'

export default class POIList extends Component {
	componentWillMount() {
		this.props.onLoad(this.props.selectedCity.description)
	}

	render() {
		return (
			<ul>
				{this.props.POIs.map((poi, i) =>
					<li
					key = {poi.place_id}
					data-id={poi.place_id}
					data-index={i}
					draggable="true"
					onDragEnd={(e) => this.handleDragEnd(e)}
					onDragStart={(e) => this.handleDragStart(e)}
					onDragOver={(e) => this.handleDragOver(e)}
					>
					{poi.name}
					</li>
				)}
			</ul>
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
