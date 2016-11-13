import {
	REQUEST_TRIP_SAVE,
	CONFIRM_TRIP_SAVE,
	FAIL_TRIP_SAVE,
	tripSaveStates,
} from '../actions/itineraryActions'

export default (state = tripSaveStates.REQUEST_NONE, action) => {
	switch (action.type) {
		case REQUEST_TRIP_SAVE:
		return tripSaveStates.REQUEST_IN_PROGRESS

		case CONFIRM_TRIP_SAVE:
		return tripSaveStates.REQUEST_DONE

		case FAIL_TRIP_SAVE:
		return tripSaveStates.REQUEST_ERROR

		default:
		return state
	}
}
