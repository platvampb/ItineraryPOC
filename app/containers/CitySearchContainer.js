import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchCity, selectCity, changeSearchText} from '../actions/actions'
import SearchCity from '../components/SearchCity'
import CityList from '../components/CityList'

class CitySearchHandler extends Component {
	render() {
		// Injected by connect() call:
		const { dispatch, cities, searchText, selectedCity, citySearchState } = this.props

		let sticky = (() => {
			if ({}.hasOwnProperty.call(selectedCity, 'description'))
				return 'sticky'

			return ''
		})()

		return (
			<div className={"searchbar-container " + sticky}>
				<SearchCity
					searchText={searchText}
					selectedCity={selectedCity}
					onCityClick={ city =>
						dispatch(selectCity(city))
					}
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
		cityPhoto: state.cityPhoto,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(CitySearchHandler)
