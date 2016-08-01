import {
	REQUEST_TRIP,
	RECEIVE_TRIP,
	tripRequestStates,
} from '../actions/itineraryActions'

export default (state = tripRequestStates.REQUEST_NONE, action) => {
	switch (action.type) {
		case REQUEST_TRIP:
		return tripRequestStates.REQUEST_IN_PROGRESS

		case RECEIVE_TRIP:
		return tripRequestStates.REQUEST_DONE

		default:
		return state
	}
}
