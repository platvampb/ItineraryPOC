import {
	REQUEST_SEARCH_CITY,
	RECEIVE_SEARCH_CITY,
	CitySearchStates,
	SELECT_CITY,
	CHANGE_SEARCH_TEXT,
} from '../actions/actions'

export default (state = CitySearchStates.SEARCH_NONE, action) => {
	switch (action.type) {
		case RECEIVE_SEARCH_CITY:
		if (action.cities > 0)
			return CitySearchStates.SEARCH_DONE
		return CitySearchStates.SEARCH_NO_RESULT

		case REQUEST_SEARCH_CITY:
		return CitySearchStates.SEARCH_IN_PROGRESS

		case SELECT_CITY:
		return CitySearchStates.SEARCH_NONE

		case CHANGE_SEARCH_TEXT:
		if (action.text.length < 3)
			return CitySearchStates.SEARCH_NONE

		default:
		return state
	}
}
