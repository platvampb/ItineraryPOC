/*
* action types
*/
export const MOVE_UP_SEARCHBAR = 'MOVE_UP_SEARCHBAR'
export const STICK_SEARCHBAR = 'STICK_SEARCHBAR'
export const SET_SEARCHBAR_READ_ONLY = 'SET_SEARCHBAR_READ_ONLY'
export const SET_SEARCHBAR_DEFAULT = 'SET_SEARCHBAR_DEFAULT'
export const SET_TRIP_DURATION = 'SET_TRIP_DURATION'
export const CLOSE_NEXT_STEP = 'CLOSE_NEXT_STEP'

/*
* other constants
*/

export const SearchbarStates = {
	DEFAULT: 'DEFAULT', //center of the screen
	PENDING: 'PENDING', //user selected city, waiting for response
	READ_ONLY: 'READ_ONLY', //user selected city, waiting for response
}
/*
* action creators
*/

export function setSearchbarReadOnly () {
	return {
		type: SET_SEARCHBAR_READ_ONLY,
	}
}

export function setSearchbarDefault () {
	return {
		type: SET_SEARCHBAR_DEFAULT,
	}
}

export function setDuration(number) {
	return {
		type: SET_TRIP_DURATION,
		duration: number,
	}
}

export function closeNextStep() {
	return dispatch => {
		dispatch((() => {return { type: CLOSE_NEXT_STEP }})())

		setTimeout(() => {
			dispatch(setSearchbarDefault())
		}, 200)
	}
}
