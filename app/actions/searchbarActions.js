/*
* action types
*/
export const MOVE_UP_SEARCHBAR = 'MOVE_UP_SEARCHBAR'
export const STICK_SEARCHBAR = 'STICK_SEARCHBAR'
export const SET_SEARCHBAR_READ_ONLY = 'SET_SEARCHBAR_READ_ONLY'

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
