import { SELECT_CITY, RECEIVE_POIS, DRAG_MOVE } from '../actions/actions'

export default (state = [], action) => {
	switch (action.type) {
		case RECEIVE_POIS:
		return action.POIs/*.map(c =>
			City(c, action)
		)*/

		case DRAG_MOVE: {
			let POIs = state.slice(0, state.length)
			if(action.fromEl.listType === "POI") {
				POIs.splice(action.fromEl.index, 1)
			}
			if(action.toEl.listType === "POI") {
				POIs.splice(action.toEl.index, 0, action.fromEl.data)
			}

			return POIs
		}

		case SELECT_CITY:
		return []

		default:
		return state
	}
}
