import React, { Component, PropTypes } from 'react'
import CityList from './CityList'

export default class DestinationSelect extends Component {
	componentDidUpdate() {
		if (this.refs.input)
			this.refs.input.focus()
	}

	render() {
		const { selectedCity, dropdownVisible, showHideDropdown, validator } = this.props

		let errorClass = () => {
			return validator.errors['destination'] ? ' error' : ''
		}

		let input = (() => {
			return (
				<input required ref="destination" id="selectCity"
					value={selectedCity.description}
					onClick={this.toggleDropdown.bind(this)}
					onBlur={this.handleBlur.bind(this)}
					readOnly={true}
				/>
			)
		})()

		let placeholderClass = (() => {
			if (selectedCity.description)
				return ' selected'
			return ''
		})()
		return (
			<div className={"select-city group" + errorClass()}>
				{input}
				<label className={"placeholder" + placeholderClass}>Pick a destination:</label>
				<div className="arrow-down"></div>
				<CityList
					toggleDropdown={this.toggleDropdown.bind(this)}
					visible={dropdownVisible}
				/>
			</div>
		)
	}

	handleBlur(e) {
		let valid = false
		if (this.props.selectedCity.description)
			valid = true

		this.props.setValid(valid, "destination")
		this.props.showHideDropdown(false)
	}

	toggleDropdown() {
		this.props.showHideDropdown(!this.props.dropdownVisible)
	}
}

DestinationSelect.propTypes = {
	selectedCity: PropTypes.shape({
		description: PropTypes.string,
	}).isRequired,
}
