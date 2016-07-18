import React, { Component, PropTypes } from 'react'
import SearchBar from '../components/SearchBar'
import DummySearchBar from '../components/DummySearchBar'

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
				<DummySearchBar
					selectedCity={selectedCity}
				/>
			</div>
		)
	}

}

SearchCity.propTypes = {
	onSearchTrigger: PropTypes.func.isRequired,
	onChangeSearchText: PropTypes.func.isRequired,
	searchText: PropTypes.string.isRequired,
}
