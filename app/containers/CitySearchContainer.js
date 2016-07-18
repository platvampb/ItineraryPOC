import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchCity, selectCity, changeSearchText } from '../actions/actions'
import { SearchbarStates } from '../actions/searchbarActions'
import SearchCity from '../components/SearchCity'
import CityList from '../components/CityList'
import POIListContainer from '../components/POI/POIListContainer'

class CitySearchHandler extends Component {
	render() {
		// Injected by connect() call:
		const { dispatch, cities, searchText, selectedCity,
			citySearchState, searchbarState, POIs } = this.props

		let containerClass = (() => {
			if (searchbarState === SearchbarStates.MOVING_UP
				|| searchbarState === SearchbarStates.STICKY) {
				return 'sticky'
			}

			if (searchbarState === SearchbarStates.LOCKED) {
				return 'selected'
			}

			return ''
		})()

		let POIList = (() => {
			if (searchbarState === SearchbarStates.STICKY) {
				return (
					<POIListContainer
						POIs={POIs}
					/>
				)
			}
		})()

		return (
			<div className={"search-outer-container " + containerClass}>
				<SearchCity
					searchText={searchText}
					selectedCity={selectedCity}
					searchbarState={searchbarState}
					onChangeSearchText={ text =>
						dispatch(changeSearchText(text))
					}
					onSearchTrigger={ text =>
						dispatch(searchCity(text))
					} />
				<CityList
					citySearchState={citySearchState}
					cities={cities}
					onCityClick={ city =>
						dispatch(selectCity(city))
					} />
				{POIList}
				{this.props.children}
			</div>
		)
	}
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
	return {
		cities: state.cities,
		selectedCity: state.selectedCity,
		searchText: state.searchText,
		citySearchState: state.citySearchState,
		searchbarState: state.searchbarState,
		cityPhoto: state.cityPhoto,
		POIs: state.POIs,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(CitySearchHandler)
