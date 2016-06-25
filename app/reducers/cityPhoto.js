import {  RECEIVE_CITY_IMAGE } from '../actions/actions'

export default (state = "", action) => {
	switch (action.type) {
		case RECEIVE_CITY_IMAGE:
		return action.img_url;

		default:
		return state
	}
}
