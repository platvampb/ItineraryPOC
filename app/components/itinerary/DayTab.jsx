import React, { Component, PropTypes } from 'react'
import { DropTarget } from 'react-dnd'

export default class DayTab extends Component {
	displayDay(dayNumber) {
		if (dayNumber < 10) {
			return '0' + dayNumber.toString()
		}
		return dayNumber.toString()
	}

	render() {
		const { connectDropTarget, active, dayNumber, changeDayHandler } = this.props

		return (
				<li className={active ? 'active' : ''}>
				<a data-toggle="tab" onClick={(e) => changeDayHandler(dayNumber)}>
					<span className="day">Day</span>
					<br/>
					<span className="day-number">{this.displayDay(dayNumber)}</span>
				</a></li>
		)
	}
}


DayTab.propTypes = {
	active: PropTypes.bool.isRequired,
	changeDayHandler: PropTypes.func.isRequired,
	dayNumber: PropTypes.number.isRequired,
}
