import $ from 'jquery'

import { mallocApi } from '../config/config.js'
/*
* action types
*/

export const CHANGE_PAGE_HEADER = 'CHANGE_PAGE_HEADER'
export const SCROLL_WINDOW = 'SCROLL_WINDOW'
export const ADD_TODO = 'ADD_TODO'
export const REQUEST_SEARCH_CITY = 'REQUEST_SEARCH_CITY'
export const RECEIVE_SEARCH_CITY = 'RECEIVE_SEARCH_CITY'
export const SELECT_CITY = 'SELECT_CITY'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const REQUEST_POIS = 'REQUEST_POIS'
export const RECEIVE_POIS = 'RECEIVE_POIS'

/*
* other constants
*/

export const CitySearchStates = {
	SEARCH_NONE: 'NONE',
	SEARCH_IN_PROGRESS: 'IN_PROGRESS',
	SEARCH_DONE: 'DONE',
	SEARCH_NO_RESULT: 'NO_RESULT',
}

/*
* action creators
*/

export function scrollWindow(window) {
	return {
		type: SCROLL_WINDOW,
		window: window,
	}
}

export function searchCity(text) {
	return dispatch => {
		dispatch(requestCityAutoComplete())

		$.get(mallocApi.baseUrl + mallocApi.regionSearch, {
			key: text,
			limit: 10,
		})
		.done(function(res){
			dispatch(receiveCityAutoComplete(res));
		})
	}
}

function requestCityAutoComplete() {
	return { type: REQUEST_SEARCH_CITY }
}

function receiveCityAutoComplete(response) {
	return {
		type: RECEIVE_SEARCH_CITY,
		cities: response.values,
	}
}

export function selectCity(city) {
	return { type: SELECT_CITY, city }
}

export function changePageHeader(text) {
	return { type: CHANGE_PAGE_HEADER, text }
}
