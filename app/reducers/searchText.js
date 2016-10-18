import { CHANGE_SEARCH_TEXT } from '../actions/actions'

export default (state = "", action) => {
	switch (action.type) {
		case CHANGE_SEARCH_TEXT:
		return action.text

		default:
		return state
	}
}
