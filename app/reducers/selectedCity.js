import { SELECT_CITY } from '../actions/actions'

export default (state = {}, action) => {
	switch (action.type) {
		case SELECT_CITY:
		return action.city
		
		default:
		return state
	}
}
