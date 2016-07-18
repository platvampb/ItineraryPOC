/*
* action types
*/
export const MOVE_UP_SEARCHBAR = 'MOVE_UP_SEARCHBAR'
export const STICK_SEARCHBAR = 'STICK_SEARCHBAR'

/*
* other constants
*/

export const SearchbarStates = {
	DEFAULT: 'DEFAULT', //center of the screen
	LOCKED: 'LOCKED', //user selected city, waiting for response
	MOVING_UP: 'MOVING_UP', //animation in progress
	STICKY: 'STICY', //sticky
}
/*
* action creators
*/

export function moveToTop() {
	return dispatch => {
		dispatch((() => {
			return {
				type: MOVE_UP_SEARCHBAR,
			}
		})())

		setTimeout(() => {
			dispatch(stickToTop());
		}, 500)
	}
}

function stickToTop(text) {
	return {
		type: STICK_SEARCHBAR,
	}
}
