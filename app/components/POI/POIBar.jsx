import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import BackgroundImage from './BackgroundImage'

class POIBar extends Component {
	render() {
		const { connectDropTarget, poi } = this.props

		let content = (
			<div className="poi-bar-wrapper">
			<InnerBar
				{...this.props}
			/>
			</div>
		)

		// Connect as drop target
		content = connectDropTarget(content)
		return content
	}
}

class InnerBar extends Component {
	render() {
		const { connectDragPreview, connectDragSource, isDragging, poi } = this.props
		const styleClass = isDragging ? 'dragging' : ''
		let hours = poi.poi.hoursOfVisit > 1 ? 'hours' : 'hour'
		let content = (
			<div className={"poi-bar " + styleClass}>
				<BackgroundImage poi={poi}/>
				<h3 className="poi-name">{poi.poi.name}</h3>
				<p className="cost">Visit for: {poi.poi.hoursOfVisit} {hours}</p>
			</div>
		)
		// Connect as drag source
		content = connectDragSource(content, { dropEffect: 'move' })
		// Connect to drag layer
		content = connectDragPreview(content)
		return content
	}
}

const POISource = {
	beginDrag(props, monitor, component) {
		return {
			id: props.id,
			index: props.index,
			name: props.poi.poi.name,
			day: props.day,
			poi: props.poi,
			dimensions: findDOMNode(component).getBoundingClientRect(),
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

POIBar.propTypes = {
	day: PropTypes.number.isRequired,
	poi: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	movePOI: PropTypes.func.isRequired,
}

InnerBar = DragSource('POI', POISource, DndSourceCollect)(InnerBar)
export default DropTarget('POI', POITarget, DndTargetCollect)(POIBar)