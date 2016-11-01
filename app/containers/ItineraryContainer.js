require('../stylesheets/itinerary.scss')

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestTrip, changeActiveDay, tripRequestStates, movePOI } from '../actions/itineraryActions'
import DayMenu from '../components/itinerary/dayMenu'
import DayItinerary from '../components/itinerary/DayItinerary'
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'
import { DragDropContext } from 'react-dnd'
//import DragPreviewLayer from '../components/itinerary/DragPreviewLayer'

class ItineraryHandler extends Component {

	componentWillMount() {
		if (this.props.tripRequestState === tripRequestStates.REQUEST_NONE) {
			this.props.dispatch(requestTrip())
		}
	}
	render() {
		// Injected by connect() call:
		const { dispatch, selectedCity, cityPhoto, tripItinerary, activeDay, tripRequestState } = this.props

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
					scrollContainer={this.scrollBy.bind(this)}
					/>
				)
			}

			return ''
		}

		return (
			<div className={"itinerary-outer-container"} ref="container">
				<div className="row">
					<div className="col-md-8 col-md-offset-2 col-sm-12">
						{renderDayMenu(tripRequestState)}
						{renderDayItinerary(tripRequestState)}
					</div>
				</div>
				{this.props.children}
			</div>
		)
	}
	scrollBy(hScroll) {
		this.refs.container.scrollTop += hScroll
	}
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
	return {
		selectedCity: state.selectedCity,
		cityPhoto: state.cityPhoto,
		tripItinerary: state.tripItinerary,
		activeDay: state.activeDay,
		tripRequestState: state.tripRequestState,
	}
}

// Wrap the component to inject dispatch and state into it
ItineraryHandler = DragDropContext(TouchBackend({ enableMouseEvents: true }))(ItineraryHandler)
export default connect(select)(ItineraryHandler)
