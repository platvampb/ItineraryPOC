import React, { Component, PropTypes } from 'react'
import SearchBar from './SearchBar'
import NextStepButtonWrapper from './NextStepButtonWrapper'

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
			searchText,
			selectedCity,
			searchbarState,
			onSearchTrigger,
			onChangeSearchText,
			onCloseNextStep,
			onNextStep,
		} = this.props

		return (
			<div className="searchbar-wrapper">
				<SearchBar
					onSearchTrigger={onSearchTrigger}
					onChangeSearchText={onChangeSearchText}
					searchText={searchText}
					selectedCity={selectedCity}
					searchbarState={searchbarState}
					onCloseNextStep={onCloseNextStep}
				/>
				<div className="error-message">
					Oops, something went wrong. Please try again...
				</div>
				<NextStepButtonWrapper
					validator={this.state.validator}
					setValid={this.state.validator.setValid.bind(this)}
					handelNextStep={onNextStep}
				/>
			</div>
		)
	}

}

SearchCity.propTypes = {
	onSearchTrigger: PropTypes.func.isRequired,
	onChangeSearchText: PropTypes.func.isRequired,
	searchText: PropTypes.string.isRequired,
	searchbarState: PropTypes.string.isRequired,
	selectedCity: PropTypes.shape({
		description: PropTypes.string,
	}).isRequired,
}
