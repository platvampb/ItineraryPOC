import { readCookie } from './cookieHelpers'

export function authUser(loginCb, logoutCb) {
	const userId = readCookie('wg_el_id')
	const sessionId = readCookie('wg_sk_el')
	const email = readCookie('wg_el')

	console.log(userId, sessionId, email)
	if (!(userId && sessionId && email)) {
		logoutCb()
		return
	}

	fetchUserProfile(loginCb)
}

function fetchUserProfile(cb) {
	setTimeout(cb, 100, {
		//placeholders
		userId: 1,
		userName: "Derp",
		userSavedTrips: 5,
	})
}
