export function createReducer(initialState, reducerMap) {
	return (state = initialState, action) => {
		const reducer = reducerMap[action.type]

		return reducer
			? reducer(state, action.payload)
			: state
	};
}

export function camelCase(string) {
	return string.toLowerCase()
	.replace(/[_\s-]+(.)/g, (m, $1) => {
		return $1.toUpperCase()
	}).replace(/\.(?=\d)/g, '_')
}
