import $ from 'jquery'

/*
* action types
*/

export const REQUEST_TRIP = 'REQUEST_TRIP'
export const RECEIVE_TRIP = 'RECEIVE_TRIP'
export const CHANGE_ACTIVE_DAY = 'CHANGE_ACTIVE_DAY'
/*
* other constants
*/

export const tripRequestStates = {
	REQUEST_NONE: 'NONE',
	REQUEST_IN_PROGRESS: 'IN_PROGRESS',
	REQUEST_DONE: 'DONE',
}

/*
* action creators
*/

export function requestTrip() {
	return dispatch => {
		dispatch(requestTripStart())

		$.get("http://127.0.0.1:3000/api/trips")
		.done(function(res){
			dispatch(receiveTrip(res.values[0]));
		})
	}
}

function requestTripStart() {
	return { type: REQUEST_TRIP }
}

function receiveTrip(res) {
	return {
		type: RECEIVE_TRIP,
		trip: res,
	}
}

export function changeActiveDay(day) {
	return {
		type: CHANGE_ACTIVE_DAY,
		day: day,
	}
}
