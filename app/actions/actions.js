import $ from 'jquery'
/*
* action types
*/

export const SELECT_CITY = 'SELECT_CITY'
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

export function selectCity(city) {
	return dispatch => {
		dispatch(((city) => {return { type: SELECT_CITY, city }})(city))

		$.get("http://127.0.0.1:3000/api/photo", {
			place_id: city.place_id,
			max_width: 1920,
		})
		.done(function(res){
			dispatch(receiveCityImage(res))
		})
	}
}
