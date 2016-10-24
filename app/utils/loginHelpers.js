import { readCookie, eraseCookie } from './cookieHelpers'

export function authUser(loginCb, logoutCb) {
	const userId = readCookie('wg_el_id')
	const sessionId = readCookie('wg_sk_el')
	const email = readCookie('wg_el')

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

export function signoutUser() {
	for (const c of ['wg_el', 'wg_el_id', 'wg_sk_el']) {
		eraseCookie(c)
	}
}
