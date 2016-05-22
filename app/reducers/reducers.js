import { combineReducers } from 'redux'
import { REQUEST_SEARCH_CITY, RECEIVE_SEARCH_CITY,  CitySearchStates, SELECT_CITY, CHANGE_SEARCH_TEXT } from '../actions/actions'

function POI(state, action) {
	switch (action.type) {
		case ADD_TODO:
		return {
			id: action.id,
			text: action.text,
			completed: false
		}
		case COMPLETE_TODO:
		if (state.id !== action.id) {
			return state
		}

		return Object.assign(state, {completed: true});

		default:
		return state
	}
}

function POIs(state = [], action) {
	switch (action.type) {
		case ADD_TODO:
		return state.concat(POI(undefined, action))

		case COMPLETE_TODO:
		return state.map(t =>
			POI(t, action)
		)
		default:
		return state
	}
}

function citySearchState(state = CitySearchStates.SEARCH_NONE, action) {
	switch (action.type) {
		case RECEIVE_SEARCH_CITY:
		if (action.cities > 0)
			return CitySearchStates.SEARCH_DONE
		else
			return CitySearchStates.SEARCH_NO_RESULT

		case REQUEST_SEARCH_CITY:
			return CitySearchStates.SEARCH_IN_PROGRESS

		default:
		return state
	}
}

function highlightSearchResult(city) {
	let desc = city.description,
		tokens = []

	var	noMatchStart = 0

	for (var match of city.matched_substrings) {
		tokens.push(desc.substring(noMatchStart, match.offset))
		tokens.push("<b>" + desc.substr(match.offset, match.length) + "</b>")

		noMatchStart = match.offset + match.length
	}

	if (noMatchStart < desc.length) {
		tokens.push(desc.substring(noMatchStart, desc.length))
	}

	return tokens.join('')
}

function City(state, action) {
	switch (action.type) {
		case RECEIVE_SEARCH_CITY:
		return Object.assign(state, {display_description: highlightSearchResult(state)});

		default:
		return state
	}
}

function Cities(state = [], action) {
	switch (action.type) {
		case RECEIVE_SEARCH_CITY:
		return action.cities/*.map(c =>
			City(c, action)
		)*/

		default:
		return state
	}
}

function selectedCity(state = {}, action) {
	switch (action.type) {
		case CHANGE_SEARCH_TEXT:
		return {}

		case SELECT_CITY:
		return action.city

		default:
		return state
	}
}

function searchText(state = "", action) {
	switch (action.type) {
		case CHANGE_SEARCH_TEXT:
		return action.text

		case SELECT_CITY:
		return action.city.description

		default:
		return state
	}
}

const CitySearchApp = combineReducers({
	Cities,
	citySearchState,
	selectedCity,
	searchText
})

export default CitySearchApp
