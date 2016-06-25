function city(state, action) {
	switch (action.type) {
		case RECEIVE_SEARCH_CITY:
		return Object.assign(state, {display_description: highlightSearchResult(state)});

		default:
		return state
	}
}
