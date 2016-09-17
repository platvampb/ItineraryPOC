import { SET_TRIP_DURATION } from '../actions/searchbarActions'

export default (state = '', action) => {
	switch (action.type) {
		case SET_TRIP_DURATION:
		return action.duration

		default:
		return state
	}
}
