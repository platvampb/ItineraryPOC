require('../stylesheets/itinerary.scss')

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changePageHeader } from '../actions/actions'
import { changeActiveDay, tripRequestStates, resetTripRequestState,
	retrieveTrip, movePOI } from '../actions/itineraryActions'
import DayMenu from '../components/itinerary/dayMenu'
import DayItinerary from '../components/itinerary/DayItinerary'
import TouchBackend from 'react-dnd-touch-backend'
import { DragDropContext } from 'react-dnd'

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
						}/>
				)
			}

			return ''
		}

		return (
			<div className={"itinerary-outer-container"}>
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
		tripItinerary: state.tripItinerary,
		activeDay: state.activeDay,
		tripRequestState: state.tripRequestState,
		tripDuration: state.tripDuration,
	}
}

// Wrap the component to inject dispatch and state into it
ItineraryHandler = DragDropContext(TouchBackend({ enableMouseEvents: true }))(ItineraryHandler)
export default connect(select)(ItineraryHandler)
