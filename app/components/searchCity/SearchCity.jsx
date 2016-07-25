import React, { Component, PropTypes } from 'react'
import SearchBar from './SearchBar'
import CityList from './CityList'
import NextStepButtonWrapper from './NextStepButtonWrapper'

export default class SearchCity extends Component {

	render() {
		const {
			searchText,
			selectedCity,
			searchbarState,
			onSearchTrigger,
			onChangeSearchText,
		} = this.props

		return (
			<div className="searchbar-wrapper">
				<SearchBar
					onSearchTrigger={onSearchTrigger}
					onChangeSearchText={onChangeSearchText}
					searchText={searchText}
					selectedCity={selectedCity}
					searchbarState={searchbarState}
				/>
				<CityList/>
				<NextStepButtonWrapper/>
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
