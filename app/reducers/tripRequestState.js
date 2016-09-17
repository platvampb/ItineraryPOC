import {
	REQUEST_TRIP,
	RECEIVE_TRIP,
	RESET_TRIP_REQUEST_STATE,
	SET_TRIP_REQUEST_ERROR,
	tripRequestStates,
} from '../actions/itineraryActions'

export default (state = tripRequestStates.REQUEST_NONE, action) => {
	switch (action.type) {
		case REQUEST_TRIP:
		return tripRequestStates.REQUEST_IN_PROGRESS

		case RECEIVE_TRIP:
		return tripRequestStates.REQUEST_DONE

		case RESET_TRIP_REQUEST_STATE:
		return tripRequestStates.REQUEST_NONE

		case SET_TRIP_REQUEST_ERROR: {
			return tripRequestStates.REQUEST_ERROR
		}

		default:
		return state
	}
}
