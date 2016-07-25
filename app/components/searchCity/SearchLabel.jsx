import React, { Component, PropTypes } from 'react'

export default class SearchLabel extends Component {
	render() {
		const { selectedCity } = this.props

		return (
			<label ref="label">
				{selectedCity.description}
				<a><i className="glyphicon glyphicon-remove-sign glyphicon-white"></i></a>
			</label>
		)
	}
}

SearchLabel.propTypes = {
	selectedCity: PropTypes.shape({
		description: PropTypes.string,
	}).isRequired,
}
