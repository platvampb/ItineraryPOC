import React, { Component, PropTypes } from 'react'
import { DropTarget } from 'react-dnd'

class DayTab extends Component {
	displayDay(dayNumber) {
		if (dayNumber < 10) {
			return '0' + dayNumber.toString()
		}
		return dayNumber.toString()
	}

	render() {
		const { connectDropTarget, active, dayNumber, changeDayHandler } = this.props

		return connectDropTarget(
				<li className={active ? 'active' : ''}>
				<a data-toggle="tab" onClick={(e) => changeDayHandler(dayNumber)}>
					<span className="day">Day</span>
					<br/>
					<span className="day-number">{this.displayDay(dayNumber)}</span>
				</a></li>
		)
	}
}

function DndTargetCollect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
	}
}
const POITarget = {
	hover(props, monitor, component) {
		props.changeDayHandler(props.dayNumber)
	},
}

DayTab.propTypes = {
	active: PropTypes.bool.isRequired,
	changeDayHandler: PropTypes.func.isRequired,
	dayNumber: PropTypes.number.isRequired,
}

export default DropTarget('POI', POITarget, DndTargetCollect)(DayTab)
