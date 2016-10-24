import React, { Component, PropTypes } from 'react'
import DayTab from './DayTab'
import Overlay from './Overlay'
import DayMenuMobile from './DayMenuMobile'

export default class DayMenu extends Component {
	constructor(props) {
		super(props)

		this.state = {
			days: Array.from(new Array(this.props.days), (val,index)=>index+1),
			menuOverlay: false,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.activeDay !== this.props.activeDay)
			this.closeOverlay()
	}

	render() {
		const { activeDay, onChangeDays } = this.props

		let renderOverlayMenu = () => {
			if (this.state.menuOverlay)
				return (
					<Overlay
						closeHandler={this.closeOverlay.bind(this)}
					>
						<DayMenuMobile
							days={this.state.days}
							activeDay={activeDay}
							onChangeDays={onChangeDays}
						/>
					</Overlay>
				)

			return ''
		}

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
					<ul className="mobile-nav-button">
					<DayTab
						key={activeDay}
						dayNumber={activeDay}
						active={true}
						changeDayHandler={this.menuClickHandler.bind(this)}
					/>
					</ul>
				</div>
				{renderOverlayMenu()}
			</div>
		)
	}

	menuClickHandler() {
		this.setState({menuOverlay: true})
	}

	closeOverlay() {
		this.setState({menuOverlay: false})
	}
}

DayMenu.propTypes = {
	activeDay: PropTypes.number.isRequired,
	onChangeDays: PropTypes.func.isRequired,
	days: PropTypes.number.isRequired,
}
