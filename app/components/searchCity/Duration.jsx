require('../../stylesheets/tooltip.scss')

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setDuration } from '../../actions/searchbarActions'
import Tooltip from './Tooltip'

class Duration extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showTooltip: false,
		}
	}

	render() {
		const { validator, tripDuration } = this.props

		let errorClass = () => {
			return validator.errors['duration'] ? ' error' : ''
		}

		let tooltipMsg = "Our tool currently works best for short trips. Trips longer than 5 days will take slightly more time to generate."

		return (
			<div className={"duration-wrapper"}>
			<div className={"duration group" + errorClass()}>
				<input type="number" required
					ref="duration"
					onBlur={this.handleEvent.bind(this)}
					onChange={this.handleEvent.bind(this)}
					value={tripDuration}
				/>
				<label className="placeholder">Trip duration (days):</label>
				<span className="bar"></span>
			</div>
			<Tooltip
				message={tooltipMsg}
				show={this.state.showTooltip}
			/>
			</div>
		)
	}

	handleEvent(e) {
		const node = this.refs.duration
		const number = this.sanitize(node)

		let valid = false

		if (this.validate(number))
			valid = true

		this.showDurationTooltip(number)

		this.props.dispatch(setDuration(number)) //Oh look! I'm Javascript! I don't care about types!
		this.props.setValid(valid, "duration")
	}

	sanitize(node) {
		var sanitized = node.value.trim()
		return sanitized.replace(/[^0-9.]/g, '')
	}

	validate(number) {
		let regex  = /^[1-9]([0-9]+)?$/
		return regex.test(number)
	}

	showHideTooltip(show) {
		this.setState({
			showTooltip: show,
		})
	}

	showDurationTooltip(days) {
		let show = false
		if (days > 5)
			show = true

		this.showHideTooltip(show)
	}
}

function select(state) {
	return {
		tripDuration: state.tripDuration,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Duration)
