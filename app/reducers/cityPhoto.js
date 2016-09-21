import {  RECEIVE_CITY_IMAGE } from '../actions/actions'
import backgroundImage from '../assets/toronto.jpg'

export default (state = "", action) => {
	switch (action.type) {
		case RECEIVE_CITY_IMAGE:
		return action.img_url

		default:
		return backgroundImage //only used for sample mode for now
	}
}
