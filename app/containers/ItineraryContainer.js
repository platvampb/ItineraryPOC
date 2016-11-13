require('../stylesheets/itinerary.scss')

import React, { Component } from 'react'
import { connect } from 'react-redux'
import TouchBackend from 'react-dnd-touch-backend'
import { DragDropContext } from 'react-dnd'

import { changePageHeader } from '../actions/actions'
import { changeActiveDay, tripRequestStates, tripSaveStates,
	resetTripRequestState, retrieveTrip, movePOI } from '../actions/itineraryActions'
import DayMenu from '../components/itinerary/dayMenu'
import DayItinerary from '../components/itinerary/DayItinerary'
import Loading from '../components/loadingScreen/Loading'


class ItineraryHandler extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tripLoaded: false,
		}
	}
	componentWillMount() {
		const dispatch = this.props.dispatch
		//reset this state so when returning to the previous page nothing gets messed up
		dispatch(resetTripRequestState())

		if ({}.hasOwnProperty.call(this.props.tripItinerary, "length_in_days")) {
			dispatch(changePageHeader(
				this.props.tripDuration + " day trip to " + this.props.tripItinerary.place.name
			))
			this.setState({
				tripLoaded: true,
			})
		} else if (this.props.params.tripId){
			dispatch(retrieveTrip(this.props.params.tripId))
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.tripRequestState === tripRequestStates.REQUEST_DONE) {
			this.setState({
				tripLoaded: true,
			})

			let itinerary = nextProps.tripItinerary
			this.props.dispatch(changePageHeader(
				itinerary.length_in_days + " day trip to " + itinerary.place.name
			))
		}
	}
	render() {
		// Injected by connect() call:
		const { dispatch, tripItinerary, activeDay, tripRequestState } = this.props

		let renderDayMenu = (tripRequestState) => {
			if (this.state.tripLoaded)
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
			if (this.state.tripLoaded) {
				return (
					<DayItinerary
						activeDay={activeDay}
						dayItinerary={tripItinerary.destinations[activeDay - 1]}
						movePOI={(fromDay, fromIndex, toIndex) =>
							dispatch(movePOI(fromDay, fromIndex, activeDay, toIndex))
						}
						scrollContainer={this.scrollBy.bind(this)}
					/>
				)
			}

			return ''
		}

		let tripSaveDisplay = (() => {
			let message = "",
				tripSaveState = this.props.tripSaveState,
				state = this.props.tripSaveState.toLowerCase()

			if (tripSaveState === tripSaveStates.REQUEST_DONE) {
				message = "Your trip has been successfully saved."
			} else if (tripSaveState === tripSaveStates.REQUEST_ERROR) {
				message = "Sorry, we could not save your trip. Please try again ltaer."
			} else if (tripSaveState === tripSaveStates.REQUEST_NONE) {
				state = "hidden"
			} else if (tripSaveState === tripSaveStates.REQUEST_IN_PROGRESS) {
				message = "Saving..."
				state = "loading"
			}

			return {
				message,
				state,
			}
		})()

		return (
			<div
				ref="container"
				className={"itinerary-outer-container"}
			>
				<div className="itinerary-container">
					{renderDayMenu(tripRequestState)}
					{renderDayItinerary(tripRequestState)}
				</div>
				<Loading
					message={tripSaveDisplay.message}
					state={tripSaveDisplay.state}
				/>
				{this.props.children}
			</div>
		)
	}
	scrollBy(hScroll) {//We have committed mortal sin! At least keep it on top level
		document.querySelector('body').scrollTop += hScroll
	}
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
	return {
		tripItinerary: state.tripItinerary,
		activeDay: state.activeDay,
		tripRequestState: state.tripRequestState,
		tripSaveState: state.tripSaveState,
		tripDuration: state.tripDuration,
	}
}

// Wrap the component to inject dispatch and state into it
ItineraryHandler = DragDropContext(TouchBackend({ enableMouseEvents: true }))(ItineraryHandler)
export default connect(select)(ItineraryHandler)
