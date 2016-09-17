import {
	SET_SEARCHBAR_READ_ONLY,
	SET_SEARCHBAR_DEFAULT,
	CLOSE_NEXT_STEP,
	SearchbarStates,
} from '../actions/searchbarActions'

import { SELECT_CITY, CHANGE_SEARCH_TEXT } from '../actions/actions'

export default (state = SearchbarStates.DEFAULT, action) => {

	switch (action.type) {

		case SET_SEARCHBAR_READ_ONLY:
		return SearchbarStates.READ_ONLY

		case SELECT_CITY:
		return SearchbarStates.PENDING

		case CLOSE_NEXT_STEP:
		return SearchbarStates.PENDING

		case CHANGE_SEARCH_TEXT:
		return SearchbarStates.DEFAULT

		case SET_SEARCHBAR_DEFAULT:
		return SearchbarStates.DEFAULT

		default:
		return state
	}
}
