import React, { Component, PropTypes } from 'react'
import DayTab from './dayTab'

export default class DayMenu extends Component {
	constructor(props) {
		super(props)

		this.state = {
			days: Array.from(new Array(this.props.days), (val,index)=>index+1),
		}
	}

	render() {
		const { activeDay, onChangeDays } = this.props
		return (
			<div className="tabs-left">
			<ul className="nav nav-tabs">
			{this.state.days.map(day =>
				<DayTab
					key={day}
					dayNumber={day}
					active={day === activeDay}
					clickHandler={onChangeDays}
				/>
			)}
			</ul>
			</div>
		)
	}
}

DayMenu.propTypes = {
	activeDay: PropTypes.number.isRequired,
	onChangeDays: PropTypes.func.isRequired,
	days: PropTypes.number.isRequired,
}
