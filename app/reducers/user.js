import { SET_USER_PROFILE } from '../actions/userActions'

export default (state = {
	loggedIn: false,
}, action) => {
	switch (action.type) {
		case SET_USER_PROFILE:
		return {
			loggedIn: true,
			profile: action.profile,
		}

		default:
		return state
	}
}
