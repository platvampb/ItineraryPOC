import {
	MOVE_UP_SEARCHBAR,
	STICK_SEARCHBAR,
	SearchbarStates,
} from '../actions/searchbarActions'

import { SELECT_CITY, CHANGE_SEARCH_TEXT } from '../actions/actions'

export default (state = SearchbarStates.DEFAULT, action) => {
	switch (action.type) {
		case MOVE_UP_SEARCHBAR:
		return SearchbarStates.MOVING_UP

		case STICK_SEARCHBAR:
		return SearchbarStates.STICKY

		case SELECT_CITY:
		return SearchbarStates.LOCKED

		case CHANGE_SEARCH_TEXT:
		return SearchbarStates.DEFAULT

		default:
		return state
	}
}
