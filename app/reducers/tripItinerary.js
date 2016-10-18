import { RECEIVE_TRIP } from '../actions/itineraryActions'

export default (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_TRIP:
		return action.trip

		default:
		return state
	}
}
