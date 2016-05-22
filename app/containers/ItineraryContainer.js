import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SearchCity from '../components/SearchCity'

class ItineraryHandler extends Component {
	render() {
		// Injected by connect() call:
		const { dispatch, selectedCity } = this.props
		return (
			<div>
			{selectedCity.description}
			</div>
		)
	}
}

ItineraryHandler.propTypes = {
	/*
	visibleTodos: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired
	}).isRequired).isRequired*/
}
// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function getSelectedCity(state) {
	return {
		selectedCity: state.selectedCity}
}

// Wrap the component to inject dispatch and state into it
export default connect(getSelectedCity)(ItineraryHandler)
