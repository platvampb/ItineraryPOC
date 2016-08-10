import { RECEIVE_TRIP, MOVE_POI } from '../actions/itineraryActions'
import update from 'react/lib/update'

export default (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_TRIP:
		return action.trip

		case MOVE_POI: {
			let sameDay = action.fromDay === action.toDay
			let fromDayItinerary = state.destinations[action.fromDay - 1]
			let fromPOIs = fromDayItinerary.slice(0, fromDayItinerary.length)
			let fromEl = fromPOIs.splice(action.fromIndex, 1)[0]

			let toPOIs = fromPOIs
			if (!sameDay) {
				let toDayItinerary = state.destinations[action.toDay - 1]
				toPOIs = toDayItinerary.slice(0, toDayItinerary.length)
				fromEl.day = action.toDay
			}

			toPOIs.splice(action.toIndex, 0, fromEl)

			let spliceArray = [[
				action.toDay - 1,
				1,
				toPOIs,
			]]

			if (!sameDay) {
				spliceArray.push(
					[
						action.fromDay - 1,
						1,
						fromPOIs,
					]
				)
			}

			let newState = update(state, {
				destinations: {
					$splice: spliceArray,
				},
			})

			return newState
		}

		default:
		return state
	}
}
