import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { searchCity, selectCity, changeSearchText} from '../actions/actions'
import SearchCity from '../components/SearchCity'
import CityList from '../components/CityList'

class CitySearchHandler extends Component {
	render() {
		// Injected by connect() call:
		const { dispatch, cities, searchText, selectedCity, citySearchState, cityPhoto } = this.props

		return (
			<div className="searchbar-container">
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
					citySearchState={citySearchState}
					Cities={cities}
					onCityClick={ city =>
						dispatch(selectCity(city))
					} />
				{this.props.children}
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
		searchText: state.searchText,
		citySearchState: state.citySearchState,
		cityPhoto: state.cityPhoto
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(CitySearchHandler)
