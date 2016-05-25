import $ from 'jquery'

/*
* action types
*/

export const ADD_TODO = 'ADD_TODO'
export const REQUEST_SEARCH_CITY = 'REQUEST_SEARCH_CITY'
export const RECEIVE_SEARCH_CITY = 'RECEIVE_SEARCH_CITY'
export const SELECT_CITY = 'SELECT_CITY'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT'
export const REQUEST_POIS = 'REQUEST_POIS'
export const RECEIVE_POIS = 'RECEIVE_POIS'
export const DRAG_START = 'DRAG_START';
export const DRAG_END = 'DRAG_END';
export const DRAG_MOVE = 'DRAG_MOVE';

/*
* other constants
*/

export const CitySearchStates = {
	SEARCH_NONE: 'NONE',
	SEARCH_IN_PROGRESS: 'IN_PROGRESS',
	SEARCH_DONE: 'DONE',
	SEARCH_NO_RESULT: 'NO_RESULT'
}

/*
* action creators
*/

let nextTodoId = 0;

export function addTodo(text) {
	return {
		type: ADD_TODO,
		id: nextTodoId++,
		text
	}
}

export function searchCity(text) {
	return dispatch => {
		dispatch(requestCityAutoComplete())

		$.get("http://192.168.0.16:3000/api/cities", {
			input: text
		})
		.done(function(res){
			dispatch(receiveCityAutoComplete(res));
		})
	}
}

function requestCityAutoComplete(text) {
	return { type: REQUEST_SEARCH_CITY }
}

function receiveCityAutoComplete(response) {
	return {
		type: RECEIVE_SEARCH_CITY,
		cities: response
	}
}

export function selectCity(city) {
	return { type: SELECT_CITY, city }
}

export function changeSearchText(text) {
	return { type: CHANGE_SEARCH_TEXT, text }
}


export function searchPOIs(description) {
	return dispatch => {
		dispatch(requestPOIs())

		$.get("http://192.168.0.16:3000/api/POIs", {
			description: description
		})
		.done(function(res){
			dispatch(receivePOIs(res));
		})
	}
}

function requestPOIs() {
	return { type: REQUEST_POIS }
}

function receivePOIs(response) {
	return {
		type: RECEIVE_POIS,
		POIs: response.results
	}
}

export function dragPOIStart (index, listType, data) {
	return {
		type: DRAG_START,
		index,
		listType,
		data
	}
}

export function dragPOIEnd () {
	return { type: DRAG_END }
}


export function dragPOIMove (fromEl, toEl) {
	return {
		type: DRAG_MOVE,
		fromEl,
		toEl
	}
}
