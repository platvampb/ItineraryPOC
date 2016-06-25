import { SELECT_CITY, CHANGE_SEARCH_TEXT, RECEIVE_CITY_IMAGE } from '../actions/actions'

export default (state = {}, action) => {
	switch (action.type) {
		case CHANGE_SEARCH_TEXT:
		return {}

		case SELECT_CITY:
		return action.city

		case RECEIVE_CITY_IMAGE:
		return Object.assign({}, state, {photo: action.img_url});

		default:
		return state
	}
}
