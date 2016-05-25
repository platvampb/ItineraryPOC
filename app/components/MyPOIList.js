import React, { Component, PropTypes } from 'react'

export default class MyPOIList extends Component {
	render() {
		return (
			<ul
				onDragOver={(e) => this.handleDragOver(e)}
			>
				{this.props.MyPOIs.map((poi, i) =>
					<li
					key={poi.place_id}
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
