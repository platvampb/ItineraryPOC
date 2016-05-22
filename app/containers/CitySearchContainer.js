import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { searchCity, selectCity, changeSearchText } from '../actions/actions'
import SearchCity from '../components/SearchCity'
import CityList from '../components/CityList'

class CitySearchHandler extends Component {
	render() {
		// Injected by connect() call:
		const { dispatch, cities, searchText, selectedCity } = this.props
		return (
			<div>
				<SearchCity
					searchText={searchText}
					selectedCity={selectedCity}
					onChangeSearchText={ text =>
						dispatch(changeSearchText(text))
					}
					onSearchTrigger={ text =>
						dispatch(searchCity(text))
					} />
				<CityList
					Cities={cities}
					onCityClick={ city =>
						dispatch(selectCity(city))
					} />
			</div>
		)
	}
}

CitySearchHandler.propTypes = {
	/*
	visibleTodos: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired
	}).isRequired).isRequired*/
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
	return {
		cities: state.Cities,
		selectedCity: state.selectedCity,
		searchText: state.searchText}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(CitySearchHandler)
