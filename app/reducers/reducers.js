import { combineReducers } from 'redux'
import { ADD_TODO, COMPLETE_TODO, VisibilityFilters } from '../actions/actions'
const { SHOW_ALL } = VisibilityFilters

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

const ItineraryApp = combineReducers({
		POIs
	})

export default ItineraryApp
