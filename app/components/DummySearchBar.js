import React, { Component, PropTypes } from 'react'
import SearchLabel from '../components/SearchLabel'

export default class DummySearchBar extends Component {

	render() {
		const { selectedCity } = this.props

		return (
			<div className="searchbar dummy">
				<SearchLabel
					selectedCity={selectedCity}
				/>
			</div>
		)
	}
}

DummySearchBar.propTypes = {
	selectedCity: PropTypes.shape({
		description: PropTypes.string.isRequired,
	}).isRequired,
}
