import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import BackgroundImage from './BackgroundImage'

class ItineraryPOI extends Component {
	render() {
		const { connectDragSource, connectDropTarget, connectDragPreview,
			isDragging, poi } = this.props

		//FIX: dragging property gets lost when drag to a different day
		const styleClass = isDragging ? 'dragging' : ''
		let content = (
			<div className="itinerary-poi-wrapper">
			<div className={"itinerary-poi " + styleClass}
			>
				<BackgroundImage poi={poi}/>
				<h3 className="poi-name">{poi.poi.name}</h3>
			</div>
			</div>
		)

		// Connect as drag source
		content = connectDragSource(content, { dropEffect: 'move' })
		// Connect as drop target
		content = connectDropTarget(content)
		// Connect to drag layer
		content = connectDragPreview(content)

		return content
	}
}

const POISource = {
	beginDrag(props, monitor) {
		return {
			id: props.id,
			index: props.index,
			name: props.poi.poi.name,
			day: props.day,
			poi: props.poi,
		}
	},
	isDragging(props, monitor) {
		return props.id === monitor.getItem().id
	},
}

const POITarget = {
	hover(props, monitor, component) {
		const dragItem = monitor.getItem()
		const dragIndex = dragItem.index
		const hoverIndex = props.index

		//window.console.log(props.poi.poi.name);
		if (dragItem.id === props.id) return

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		const clientOffset = monitor.getClientOffset()
		//window.console.log(clientOffset)
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		//window.console.log(hoverMiddleY, hoverClientY)
		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

		props.movePOI(dragItem.day, dragIndex, hoverIndex)

		//This is according to official example
		dragItem.index = hoverIndex
		dragItem.day = props.day
	},
}

function DndSourceCollect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	}
}

function DndTargetCollect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
	}
}

ItineraryPOI.propTypes = {
	day: PropTypes.number.isRequired,
	poi: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	movePOI: PropTypes.func.isRequired,
}

ItineraryPOI = DropTarget('POI', POITarget, DndTargetCollect)(ItineraryPOI)
export default DragSource('POI', POISource, DndSourceCollect)(ItineraryPOI)
