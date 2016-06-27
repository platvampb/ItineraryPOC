import { RECEIVE_POIS, DRAG_MOVE } from '../actions/actions'

export default (state = [], action) => {
	switch (action.type) {
		case RECEIVE_POIS:
		return []

		case DRAG_MOVE: {
			let myPOIs = state.slice(0, state.length)
			if(action.fromEl.listType === "MyPOI") {
				myPOIs.splice(action.fromEl.index, 1)
			}
			if(action.toEl.listType === "MyPOI") {
				myPOIs.splice(action.toEl.index, 0, action.fromEl.data)
			}

			return myPOIs
		}

		default:
		return state
	}
}
