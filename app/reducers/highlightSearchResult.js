import { REQUEST_SEARCH_CITY, RECEIVE_SEARCH_CITY,  CitySearchStates, SELECT_CITY, CHANGE_SEARCH_TEXT, RECEIVE_POIS, REQUEST_POIS, DRAG_START, DRAG_END, DRAG_MOVE, RECEIVE_CITY_IMAGE } from '../actions/actions'

export default (city) => {
	let desc = city.description,
		tokens = []

	var	noMatchStart = 0

	for (var match of city.matched_substrings) {
		tokens.push(desc.substring(noMatchStart, match.offset))
		tokens.push("<b>" + desc.substr(match.offset, match.length) + "</b>")

		noMatchStart = match.offset + match.length
	}

	if (noMatchStart < desc.length) {
		tokens.push(desc.substring(noMatchStart, desc.length))
	}

	return tokens.join('')
}
