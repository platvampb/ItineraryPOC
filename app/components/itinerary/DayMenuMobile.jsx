import React, { Component, PropTypes } from 'react'
import DayTab from './DayTab'

export default class DayMenuMobile extends Component {
	render() {
		const { days, activeDay, onChangeDays } = this.props

		return (
			<div className="mobile-nav-menu-wrapper">
			<ul className="mobile-nav-menu">
				{this.props.days &&
					this.props.days.map(day =>
					<DayTab
						key={day}
						dayNumber={day}
						active={day === activeDay}
						changeDayHandler={onChangeDays}
					/>
				)}
			</ul>
			</div>
		)
	}
}

DayMenuMobile.propTypes = {
	activeDay: PropTypes.number.isRequired,
	onChangeDays: PropTypes.func.isRequired,
	days: PropTypes.array.isRequired,
}
