/*
* action types
*/
export const SET_USER_PROFILE = 'SET_USER_PROFILE'
export const CLEAR_USER_PROFILE = 'CLEAR_USER_PROFILE'

/*
* action creators
*/

export function login(profile) {
	return {
		type: SET_USER_PROFILE,
		profile: profile,
	}
}

export function logout() {
	return {
		type: CLEAR_USER_PROFILE,
	}
}
