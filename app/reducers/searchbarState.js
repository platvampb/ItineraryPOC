import {
	SET_SEARCHBAR_READ_ONLY,
	SearchbarStates,
} from '../actions/searchbarActions'

import { SELECT_CITY, CHANGE_SEARCH_TEXT } from '../actions/actions'

export default (state = SearchbarStates.DEFAULT, action) => {
	switch (action.type) {

		case SET_SEARCHBAR_READ_ONLY:
		return SearchbarStates.READ_ONLY

		case SELECT_CITY:
		return SearchbarStates.PENDING

		case CHANGE_SEARCH_TEXT:
		return SearchbarStates.DEFAULT

		default:
		return state
	}
}
