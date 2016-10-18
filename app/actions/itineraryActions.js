import $ from 'jquery'
import { mallocApi } from '../config/config.js'
import { readCookie } from '../utils/cookieHelpers.js'

/*
* action types
*/

export const REQUEST_TRIP = 'REQUEST_TRIP'
export const RECEIVE_TRIP = 'RECEIVE_TRIP'
export const RESET_TRIP_REQUEST_STATE = 'RESET_TRIP_REQUEST_STATE'
export const SET_TRIP_REQUEST_ERROR = 'SET_TRIP_REQUEST_ERROR'
export const CHANGE_ACTIVE_DAY = 'CHANGE_ACTIVE_DAY'
export const MOVE_POI = 'MOVE_POI'
/*
* other constants
*/

export const tripRequestStates = {
	REQUEST_NONE: 'NONE',
	REQUEST_IN_PROGRESS: 'IN_PROGRESS',
	REQUEST_DONE: 'DONE',
	REQUEST_ERROR: 'ERROR',
}

/*
* action creators
*/

export function requestTrip(placeId, duration) {
	return dispatch => {
		dispatch(requestTripStart())

		let userId = readCookie('wg_el_id')
		let sessionId = readCookie('wg_sk_el')
		let email = readCookie('wg_el')

		userId = userId == null ? "1" : userId;
		sessionId = sessionId == null ? "" : sessionId;
		email = email == null ? "" : email;

		$.ajax({
			type: 'POST',
			url: mallocApi.baseUrl + mallocApi.command,
			data: '{\
				"cmd":"create trip",\
				"data":\
					{\
						"user_id":"1",\
						"preferred_commute":"driving",\
						"pace":"REGULAR",\
						"place_id":"' + placeId + '", "number_of_days":"' + duration + '",\
						"page_number":"1"\
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
