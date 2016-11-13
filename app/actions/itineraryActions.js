import $ from 'jquery'
import { mallocApi } from '../config/config.js'
import { getSessionValues } from '../utils/loginHelpers.js'
import { parseTripToEdit } from '../utils/itineraryHelpers'
/*
* action types
*/

export const REQUEST_TRIP = 'REQUEST_TRIP'
export const RECEIVE_TRIP = 'RECEIVE_TRIP'
export const RESET_TRIP_REQUEST_STATE = 'RESET_TRIP_REQUEST_STATE'
export const SET_TRIP_REQUEST_ERROR = 'SET_TRIP_REQUEST_ERROR'
export const CHANGE_ACTIVE_DAY = 'CHANGE_ACTIVE_DAY'
export const MOVE_POI = 'MOVE_POI'

export const REQUEST_TRIP_SAVE = 'REQUEST_TRIP_SAVE'
export const CONFIRM_TRIP_SAVE = 'CONFIRM_TRIP_SAVE'
export const FAIL_TRIP_SAVE = 'FAIL_TRIP_SAVE'
/*
* other constants
*/

export const tripRequestStates = {
	REQUEST_NONE: 'NONE',
	REQUEST_IN_PROGRESS: 'IN_PROGRESS',
	REQUEST_DONE: 'DONE',
	REQUEST_ERROR: 'ERROR',
}
//they are the same for now
export const tripSaveStates = tripRequestStates

/*
* action creators
*/

export function requestTrip(placeId, duration) {
	return dispatch => {
		dispatch(requestTripStart())

		//we can do || because readCookie doesn't return number 0
		const { userId, sessionId, email } = getSessionValues()
		$.ajax({
			type: 'POST',
			url: mallocApi.baseUrl + mallocApi.command,
			headers: {
				"wg_el_id": userId,
				"wg_el": email,
				"wg_sk_el": sessionId,
			},
			data: '{\
				"cmd": "create trip",\
				"data":\
					{\
						"user_id": "'+ userId + '",\
						"preferred_commute": "driving",\
						"pace": "REGULAR",\
						"place_id": "' + placeId + '", "number_of_days":"' + duration + '",\
						"page_number": "1"\
					}\
				}', //TODO: JSON.stringify ({name: 'jonas'}),

			contentType: "application/json",
			dataType: 'json',
		}).done(function(res){
			let retryFetchTrip = (id, counter) => {
				fetchTripById(id)
				.done(function(res) {
					if (!res.values || res.values.length > 0) {
						dispatch(receiveTrip(res.values[0]))
						return
					}
					if (counter < 3) {
						counter++
						setTimeout(retryFetchTrip, 4000, id, counter)
					} else {
						dispatch(receiveTripError())
					}
				})
			}

			retryFetchTrip(res.data, 0)
		}).fail(function(error) {
			dispatch(receiveTripError())
		})
	}
}

export function retrieveTrip(id) {
	return dispatch => {
		dispatch(requestTripStart())

		fetchTripById(id)
		.done(function(res){
			dispatch(receiveTrip(res.values[0]))
		}).fail(function(){
			dispatch(receiveTripError())
		})
	}
}

function fetchTripById(id) {
	return $.get(mallocApi.baseUrl + mallocApi.tripGet, {
		id: id,
	})
}

function requestTripStart() {
	return { type: REQUEST_TRIP }
}

function receiveTrip(res) {
	if (res && {}.hasOwnProperty.call(res, "length_in_days"))
		return {
			type: RECEIVE_TRIP,
			trip: res,
		}

	return receiveTripError()
}

function receiveTripError() {
	return { type: SET_TRIP_REQUEST_ERROR }
}

export function resetTripRequestState() {
	return { type: RESET_TRIP_REQUEST_STATE}
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

export function saveTrip(trip) {
	return dispatch => {
		dispatch(saveTripStart())

		const { userId, sessionId, email } = getSessionValues()
		const data = parseTripToEdit(trip)

		$.ajax({
			type: 'POST',
			url: mallocApi.baseUrl + mallocApi.command,
			headers: {
				"wg_el_id": userId,
				"wg_el": email,
				"wg_sk_el": sessionId,
			},
			data: data,
			contentType: "application/json",
			dataType: 'json',
		}).done(res => {
			dispatch(saveTripSuccess(res))
		}).fail(err => {
			dispatch(saveTripError())
		})
	}
}

function saveTripStart() {
	return { type: REQUEST_TRIP_SAVE }
}

function saveTripSuccess(res) {
	if (res && res.result)
		return { type: CONFIRM_TRIP_SAVE }

	return saveTripError()
}

function saveTripError() {
	return { type: FAIL_TRIP_SAVE }
}
