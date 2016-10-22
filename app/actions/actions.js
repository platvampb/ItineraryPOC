/*
* action types
*/

export const CHANGE_PAGE_HEADER = 'CHANGE_PAGE_HEADER'
export const SCROLL_WINDOW = 'SCROLL_WINDOW'
export const ADD_TODO = 'ADD_TODO'
export const RECEIVE_SEARCH_CITY = 'RECEIVE_SEARCH_CITY'
export const SELECT_CITY = 'SELECT_CITY'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const REQUEST_POIS = 'REQUEST_POIS'
export const RECEIVE_POIS = 'RECEIVE_POIS'

/*
* action creators
*/

export function scrollWindow(window) {
	return {
		type: SCROLL_WINDOW,
		window: window,
	}
}

export function selectCity(city) {
	return { type: SELECT_CITY, city }
}

export function changePageHeader(text) {
	return { type: CHANGE_PAGE_HEADER, text }
}
