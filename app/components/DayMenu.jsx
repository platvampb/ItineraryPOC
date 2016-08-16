import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import DayTab from './DayTab'


export default class DayMenu extends Component {
	constructor(props) {
		super(props)

		this.state = {
			days: Array.from(new Array(this.props.days), (val,index)=>index+1),
			mobileMenuDays: [],
			mobileMenuExpanded: false,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.activeDay !== nextProps.activeDay)
			this.setState({
				mobileMenuExpanded: false,
				mobileMenuDays: [],
			})
	}

	render() {
		const { activeDay, onChangeDays } = this.props
		return (
			<div>
				<div className="tabs-left hidden-xs">
					<ul className="nav nav-tabs">
					{this.state.days.map(day =>
						<DayTab
							key={day}
							dayNumber={day}
							active={day === activeDay}
							changeDayHandler={onChangeDays}
						/>
					)}
					</ul>
				</div>
				<div className="visible-xs mobile-nav">
					<ul className="mobile-nav-menu">
						<ReactCSSTransitionGroup
							transitionName="day-menu"
							transitionEnterTimeout={150}
							//setting leavetimeout exactly as animation time causes weird stay-over flashes
							transitionLeaveTimeout={145}
						>
						{this.state.mobileMenuDays &&
							this.state.mobileMenuDays.map(day =>
							<DayTab
								key={day}
								dayNumber={day}
								active={false}
								changeDayHandler={onChangeDays}
							/>
						)}
						</ReactCSSTransitionGroup>
					</ul>
					<ul className="mobile-nav-button">
					<DayTab
						key={activeDay}
						dayNumber={activeDay}
						active={true}
						changeDayHandler={this.menuClickHandler.bind(this)}
					/>
					</ul>
				</div>
			</div>
		)
	}

	menuClickHandler (activeDay) {
		let expanded = this.state.mobileMenuExpanded
		if (expanded) {
			let days = this.state.mobileMenuDays
			let removeDay = () => {
				if (days.length <= 0)
					return

				days.pop()
				let nextState = {
					mobileMenuDays: [...days],
				}
				if (expanded)
					nextState.mobileMenuExpanded = false

				return nextState
			}
			this.updateByStep(removeDay)
		} else {
			let days = this.state.days.filter( day => day !== activeDay )
			let addDay = () => {
				if (days.length <= 0)
					return

				let nextState = {
					mobileMenuDays: [...this.state.mobileMenuDays, days.shift()],
				}
				if (!expanded)
					nextState.mobileMenuExpanded = true

				return nextState
			}
			this.updateByStep(addDay)
		}
	}

	updateByStep(cb) {
		let nextState = cb()
		if (nextState)
			this.setState(nextState, () => {window.setTimeout(() => this.updateByStep(cb), 70)})
	}
}


DayMenu.propTypes = {
	activeDay: PropTypes.number.isRequired,
	onChangeDays: PropTypes.func.isRequired,
	days: PropTypes.number.isRequired,
}
