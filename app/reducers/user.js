import { SET_USER_PROFILE, CLEAR_USER_PROFILE } from '../actions/userActions'

export default (state = {
	loggedIn: false,
}, action) => {
	switch (action.type) {
		case SET_USER_PROFILE:
		return {
			loggedIn: true,
			profile: action.profile,
		}

		case CLEAR_USER_PROFILE:
		return {
			loggedIn: false,
		}

		default:
		return state
	}
}
