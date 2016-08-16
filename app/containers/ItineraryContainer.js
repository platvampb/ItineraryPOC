require('../stylesheets/itinerary.scss')

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestTrip, changeActiveDay, tripRequestStates, movePOI } from '../actions/itineraryActions'
import DayMenu from '../components/DayMenu'
import DayItinerary from '../components/DayItinerary'

class ItineraryHandler extends Component {
	componentWillMount() {
		if (this.props.tripRequestState === tripRequestStates.REQUEST_NONE) {
			this.props.dispatch(requestTrip())
		}
	}
	render() {
		// Injected by connect() call:
		const { dispatch, selectedCity, tripItinerary, activeDay, tripRequestState } = this.props

		let renderDayMenu = (tripRequestState) => {
			if (tripRequestState === tripRequestStates.REQUEST_DONE)
				return (
					<DayMenu
					days={tripItinerary.length_in_days}
					activeDay={activeDay}
					onChangeDays={day =>
						dispatch(changeActiveDay(day))
					}/>
				)

			return ''
		}

		let renderDayItinerary = (tripRequestState) => {
			if (tripRequestState === tripRequestStates.REQUEST_DONE) {
				return (
					<DayItinerary
					activeDay={activeDay}
					dayItinerary={tripItinerary.destinations[activeDay - 1]}
					movePOI={(fromDay, fromIndex, toIndex) =>
						dispatch(movePOI(fromDay, fromIndex, activeDay, toIndex))
					}
					/>
				)
			}

			return ''
		}

		return (
			<div className={"itinerary-outer-container"}>
				<div className="header row">
				<div className="col-sm-8 col-sm-offset-2 col-xs-12">
					<img src="https://www.wewherego.com/img/logo/logo_wherego.png"/>
					<h1>Dudemaster's 3-day trip to Abaquerque.</h1>
				</div>
				</div>
				<div className="content col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
					{renderDayMenu(tripRequestState)}
					{renderDayItinerary(tripRequestState)}
				</div>
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
		tripItinerary: state.tripItinerary,
		activeDay: state.activeDay,
		tripRequestState: state.tripRequestState,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ItineraryHandler)
