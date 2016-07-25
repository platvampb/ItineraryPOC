require('../stylesheets/search.scss')

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchCity, changeSearchText } from '../actions/actions'
import { SearchbarStates } from '../actions/searchbarActions'
import SearchCity from '../components/searchCity/SearchCity'

class CitySearchHandler extends Component {
	render() {
		// Injected by connect() call:
		const { dispatch, searchText, selectedCity,
			citySearchState, searchbarState, cityPhoto } = this.props

		let containerClass = (() => {
			if (searchbarState === SearchbarStates.PENDING) {
				return 'selected'
			}
			if (searchbarState === SearchbarStates.READ_ONLY) {
				return 'next'
			}

			return ''
		})()

		let fetchingPhoto = ((selectedCity, cityPhoto) => {
			return (selectedCity.id && !selectedCity.photo)
		})(selectedCity, cityPhoto)

		let divStyle = cityPhoto ? {
			backgroundImage: 'url(' + cityPhoto + ')',
			opacity: fetchingPhoto ? '0' : '1',
		} : { opacity: '0' };

		return (
			<div className={"search-outer-container " + containerClass}>
				<div className="search-background-hack" style={divStyle}/>
				<SearchCity
					searchText={searchText}
					selectedCity={selectedCity}
					searchbarState={searchbarState}
					citySearchState={citySearchState}
					onChangeSearchText={ text =>
						dispatch(changeSearchText(text))
					}
					onSearchTrigger={ text =>
						dispatch(searchCity(text))
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
		selectedCity: state.selectedCity,
		searchText: state.searchText,
		citySearchState: state.citySearchState,
		searchbarState: state.searchbarState,
		cityPhoto: state.cityPhoto,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(CitySearchHandler)
