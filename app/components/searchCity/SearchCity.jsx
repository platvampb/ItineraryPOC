import React, { Component, PropTypes } from 'react'
import DestinationSelect from './DestinationSelect'
import NextStepButtonWrapper from './NextStepButtonWrapper'
import Duration from './Duration.jsx'

export default class SearchCity extends Component {
	constructor(props) {
		super(props)

		this.state = {
			validator: {
				valid: false,
				errors: {},
				setValid: (valid, field) => {
					let errors = Object.assign(this.state.validator.errors, {})
					if (valid)
						delete errors[field]
					else
						errors[field] = true

					this.setState({
						validator: Object.assign(
							this.state.validator,
							{
								valid: valid,
								errors: errors,
							},
						),
					})
				},
			},
		}
	}

	render() {
		const {
			selectedCity,
			onNextStep,
			dropdownVisible,
			showHideDropdown,
		} = this.props

		return (
			<div className="searchbar-wrapper">
				<DestinationSelect
					showHideDropdown={showHideDropdown}
					selectedCity={selectedCity}
					dropdownVisible={dropdownVisible}
					validator={this.state.validator}
					setValid={this.state.validator.setValid.bind(this)}
				/>
				<Duration
					validator={this.state.validator}
					setValid={this.state.validator.setValid.bind(this)}
				/>
				<div className="error-message">
					Oops, something went wrong. Please try again...
				</div>
				<NextStepButtonWrapper
					validator={this.state.validator}
					handelNextStep={onNextStep}
				/>
			</div>
		)
	}
}

SearchCity.propTypes = {
	selectedCity: PropTypes.shape({
		description: PropTypes.string,
	}).isRequired,
	onNextStep: PropTypes.func.isRequired,
	dropdownVisible: PropTypes.bool.isRequired,
	showHideDropdown: PropTypes.func.isRequired,
}
