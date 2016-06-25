import { DRAG_START, DRAG_END, DRAG_MOVE } from '../actions/actions'

export default (state = {}, action) => {
	switch (action.type) {
		case DRAG_START:
		return {
			listType: action.listType,
			index: Number(action.index),
			data: action.data
		}

		case DRAG_END:
		return {}

		case DRAG_MOVE:
		return {
			listType: action.toEl.listType,
			index: Number(action.toEl.index),
			data: state.data
		}

		default:
		return state
	}
}
