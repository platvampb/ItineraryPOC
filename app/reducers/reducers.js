import { combineReducers } from 'redux'
import { REQUEST_SEARCH_CITY, RECEIVE_SEARCH_CITY,  CitySearchStates, SELECT_CITY, CHANGE_SEARCH_TEXT, RECEIVE_POIS, REQUEST_POIS, DRAG_START, DRAG_END, DRAG_MOVE } from '../actions/actions'

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

function POIs(state = [], action) {
	switch (action.type) {
		case RECEIVE_POIS:
		return action.POIs/*.map(c =>
			City(c, action)
		)*/

		case DRAG_MOVE:
		let POIs = state.slice(0, state.length);
		if(action.fromEl.listType == "POI") {
			POIs.splice(action.fromEl.index, 1)
		}
		if(action.toEl.listType == "POI") {
			POIs.splice(action.toEl.index, 0, action.fromEl.data)
		}

		return POIs

		default:
		return state
	}
}

function MyPOIs(state = [], action) {
	switch (action.type) {
		case DRAG_MOVE:
		console.log(1, state)
		let myPOIs = state.slice(0, state.length);
		if(action.fromEl.listType == "MyPOI") {
			myPOIs.splice(action.fromEl.index, 1)
		}
		if(action.toEl.listType == "MyPOI") {
			myPOIs.splice(action.toEl.index, 0, action.fromEl.data)
		}
		console.log(2, state)

		return myPOIs

		default:
		return state
	}
}

function dragPOI( state = {}, action) {
	switch (action.type) {
		case DRAG_START:
		return {
			listType: action.listType,
			index: Number(action.index),
			data: action.data
		}

		case DRAG_END:
		return {}

		case DRAG_MOVE:
		return {
			listType: action.toEl.listType,
			index: Number(action.toEl.index),
			data: state.data
		}

		default:
		return state
	}
}

const CitySearchApp = combineReducers({
	Cities,
	citySearchState,
	selectedCity,
	searchText,
	POIs,
	MyPOIs,
	dragPOI
})

export default CitySearchApp
