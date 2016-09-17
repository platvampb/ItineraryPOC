import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setDuration } from '../../actions/searchbarActions'

class Duration extends Component {
	render() {
		const { validator, setValid, tripDuration } = this.props

		let errorClass = () => {
			return validator.errors['duration'] ? ' error' : ''
		}

		return (
			<div className={"duration-wrapper group" + errorClass()}>
				<input type="number" required
					ref="duration"
					onBlur={this.handleEvent.bind(this)}
					onChange={this.handleEvent.bind(this)}
					value={tripDuration}
				/>
				<label className="placeholder">Trip duration (days):</label>
				<span className="bar"></span>
			</div>
		)
	}

	handleEvent(e) {
		const node = this.refs.duration
		const number = this.sanitize(node)

		let valid = false

		if (this.validate(number))
			valid = true

		this.props.dispatch(setDuration(number)) //Oh look, I'm Javascript, I don't care about types!
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
}

function select(state) {
	return {
		tripDuration: state.tripDuration,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Duration)
