import { RECEIVE_TRIP, MOVE_POI } from '../actions/itineraryActions'
import update from 'react/lib/update'

export default (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_TRIP:
		return action.trip

		default:
		return state
	}
}
