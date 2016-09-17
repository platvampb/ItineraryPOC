require('../stylesheets/search.scss')

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchCity, changeSearchText, changePageHeader } from '../actions/actions'
import { SearchbarStates, closeNextStep } from '../actions/searchbarActions'
import { requestTrip, tripRequestStates, resetTripRequestState } from '../actions/itineraryActions'
import SearchCity from '../components/searchCity/SearchCity'
import Loading from '../components/searchCity/Loading'

class CitySearchHandler extends Component {

	componentWillMount() {
		this.props.dispatch(changePageHeader("Let's get started!"))
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.tripRequestState === tripRequestStates.REQUEST_DONE) {
			this.context.router.push('/itinerary/' + nextProps.tripItinerary.id)
		}

		if (nextProps.searchbarState === SearchbarStates.PENDING) {
			this.props.dispatch(resetTripRequestState())
		}
	}

	render() {
		// Injected by connect() call:
		const { dispatch, searchText, selectedCity,
			citySearchState, searchbarState, tripRequestState,
			cityPhoto, tripDuration } = this.props

		let containerClass = (() => {
			if (searchbarState === SearchbarStates.PENDING) {
				return 'selected'
			}
			if (searchbarState === SearchbarStates.READ_ONLY) {
				if (tripRequestState === tripRequestStates.REQUEST_IN_PROGRESS) {
					return 'loading'
				}
				if (tripRequestState === tripRequestStates.REQUEST_ERROR) {
					return 'error'
				}
				return 'next'
			}

			return ''
		})()

		return (
			<div className={"search-outer-container " + containerClass}>
				<SearchCity
					searchText={searchText}
					selectedCity={selectedCity}
					searchbarState={searchbarState}
					citySearchState={citySearchState}
					onCloseNextStep={ () =>
						dispatch(closeNextStep())
					}
					onChangeSearchText={ text =>
						dispatch(changeSearchText(text))
					}
					onSearchTrigger={ text =>
						dispatch(searchCity(text))
					}
					onNextStep={ () =>
						dispatch(requestTrip(selectedCity.id, tripDuration))
					}
					/>
				<Loading/>
				{this.props.children}
			</div>
		)
	}
}

CitySearchHandler.contextTypes = {
	router: React.PropTypes.object.isRequired,
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
		tripRequestState: state.tripRequestState,
		tripItinerary: state.tripItinerary,
		tripDuration: state.tripDuration,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(CitySearchHandler)
