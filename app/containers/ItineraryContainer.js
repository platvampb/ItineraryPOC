import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { searchCity, completeTodo, VisibilityFilters } from '../actions/actions'
import SearchCity from '../components/SearchCity'
import POIList from '../components/POIList'

class ItineraryApp extends Component {
	render() {
		// Injected by connect() call:
		const { dispatch, visibleTodos } = this.props
		return (
			<div>
				<SearchCity
				onSearchTrigger={ text =>
						dispatch(searchCity(text))
					} />
				<POIList
					POIs={visibleTodos} />
			</div>
		)
	}
}

ItineraryApp.propTypes = {
	visibleTodos: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired
	}).isRequired).isRequired
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
	return {
		visibleTodos: state.POIs}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ItineraryApp)
