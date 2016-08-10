import $ from 'jquery'

/*
* action types
*/

export const REQUEST_TRIP = 'REQUEST_TRIP'
export const RECEIVE_TRIP = 'RECEIVE_TRIP'
export const CHANGE_ACTIVE_DAY = 'CHANGE_ACTIVE_DAY'
export const MOVE_POI = 'MOVE_POI'
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

		$.get("http://192.168.0.13:3000/api/trips")
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

export function movePOI(fromDay, fromIndex, toDay, toIndex) {
	return {
		type: MOVE_POI,
		fromDay,
		fromIndex,
		toDay,
		toIndex,
	}
}
