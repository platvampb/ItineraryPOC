import { CHANGE_ACTIVE_DAY } from '../actions/actions'

export default (state = 1, action) => {
	switch (action.type) {
		case CHANGE_ACTIVE_DAY:
		return action.day

		default:
		return state
	}
}
