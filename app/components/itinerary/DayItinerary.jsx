import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'

import POIBar from '../POI/POIBar'
import POIPreview from '../POI/POIPreview'

class DayItinerary extends Component {
	constructor(props) {
		super(props)

		this.state = {
			offset: {
				x: 0,
				y: 0,
			},
		}
	}

	componentDidMount() {
		let offset = this.refs.tabPane.getBoundingClientRect()
		this.setState({
			offset: {
				x: offset.left,
				y: offset.top,
			},
		})
	}

	render() {
		const { dayItinerary, movePOI, connectDropTarget } = this.props
		let content = (
			<div className="tab-content">
			<div className="tab-pane active" ref="tabPane">
			<POIPreview containerOffset={this.state.offset}/>
			{dayItinerary.map((poi, i) =>
				<POIBar
					key={poi.poi.id}
					id={poi.poi.id}
					poi={poi}
					index={i}
					day={poi.day}
					movePOI={movePOI}
				/>
			)}
			</div>
			</div>
		)
		// Connect as drop target
		content = connectDropTarget(content)
		return content
	}
}

const POITarget = {
	hover(props, monitor, component) {
		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
		const clientOffset = monitor.getSourceClientOffset()
		const clientDimensions = monitor.getItem().dimensions
		const windowHeight = window.innerHeight;
		const hoverClientY = clientOffset.y + clientDimensions.height

		if (clientOffset.y < 0) {
			props.scrollContainer(clientOffset.y)
			return
		}

		if (hoverClientY > windowHeight) {
			props.scrollContainer(hoverClientY - windowHeight)
			return
		}
	},
}

function DndTargetCollect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
	}
}

export default DropTarget('POI', POITarget, DndTargetCollect)(DayItinerary)

DayItinerary.propTypes = {
	dayItinerary: PropTypes.array.isRequired,
	movePOI: PropTypes.func.isRequired,
	scrollContainer: PropTypes.func.isRequired,
}
