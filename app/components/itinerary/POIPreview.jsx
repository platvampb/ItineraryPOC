import React, { PropTypes } from 'react'
import DragLayer from 'react-dnd/lib/DragLayer'

function collect (monitor) {
		return {
			item: monitor.getItem(),
			currentOffset: monitor.getSourceClientOffset(),
			isDragging: monitor.isDragging(),
			initialOffset: monitor.getInitialSourceClientOffset(),
		}
}


export default class POIPreview extends React.Component {
	render () {
		if (!this.props.isDragging) {
			return (<div></div>)
		}

		return (
			<div className="itinerary-poi"
				style={this.getItemStyles()}
			>
			{this.props.item.name}
			</div>
		)
	}


	getItemStyles () {
		let currentOffset = this.props.currentOffset
		let initialOffset = this.props.containerOffset
		if (!currentOffset) {
			return {
				display: 'block',
			}
		}

		var x = currentOffset.x - initialOffset.x
		var y = currentOffset.y - initialOffset.y
		var transform = `translate(${x}px, ${y}px)`

		return {
			pointerEvents: 'none',
			transform: transform,
			WebkitTransform: transform,
			color: 'black',
			zIndex: 999,
			position: 'absolute',
		}
	}
}

POIPreview.propTypes = {
	id: React.PropTypes.number,
	currentOffset: React.PropTypes.shape({
		x: React.PropTypes.number,
		y: React.PropTypes.number,
	}),
	isDragging: React.PropTypes.bool,
	containerOffset: React.PropTypes.shape({
		x: React.PropTypes.number,
		y: React.PropTypes.number,
	}),
};

export default DragLayer(collect)(POIPreview);
