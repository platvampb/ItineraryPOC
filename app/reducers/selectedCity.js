import { SELECT_CITY, CHANGE_SEARCH_TEXT } from '../actions/actions'

export default (state = {}, action) => {
	switch (action.type) {
		case CHANGE_SEARCH_TEXT:
		return {}

		case SELECT_CITY:
		return action.city

		default:
		return state
	}
}
