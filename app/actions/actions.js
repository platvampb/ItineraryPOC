import $ from 'jquery'

/*
* action types
*/

export const ADD_TODO = 'ADD_TODO'
export const SEARCH_CITY = 'SEARCH_CITY'
export const COMPLETE_TODO = 'COMPLETE_TODO'

/*
* other constants
*/

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
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
	};
}

export function searchCity(text) {
	return dispatch => {
		dispatch(requestCityAutoComplete())
		$.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
			input: text,
			types: '(cities)',
			key: 'AIzaSyBafQ3H7ZXVGqbh8Z9Z3h27wQzniA64CJI'
		})
		.done(function(res){
			dispatch(receiveCityAutoComplete(res.body.predictions));
		})
	}
}

function requestCityAutoComplete(text) {
	return { type: COMPLETE_TODO }
}

function receiveCityAutoComplete(response) {
	console.log(response)
	return { type: COMPLETE_TODO }
}

export function completeTodo(id) {
	return { type: COMPLETE_TODO, id }
}
