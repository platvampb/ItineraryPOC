import { CHANGE_PAGE_HEADER} from '../actions/actions'

export default (state = '', action) => {
	switch (action.type) {
		case CHANGE_PAGE_HEADER:
		return action.text

		default:
		return state
	}
}
