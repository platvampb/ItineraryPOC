import { SELECT_CITY, CHANGE_SEARCH_TEXT } from '../actions/actions'

export default (state = "", action) => {
	switch (action.type) {
		case CHANGE_SEARCH_TEXT:
		return action.text

		case SELECT_CITY:
		return action.city.description

		default:
		return state
	}
}
