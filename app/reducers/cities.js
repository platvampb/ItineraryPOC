import { RECEIVE_SEARCH_CITY } from '../actions/actions'

export default (state = [], action) => {
	switch (action.type) {
		case RECEIVE_SEARCH_CITY:
		return action.cities/*.map(c =>
			City(c, action)
		)*/

		default:
		return state
	}
}
