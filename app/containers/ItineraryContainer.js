import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { searchPOIs, dragPOIStart, dragPOIEnd, dragPOIMove } from '../actions/actions'
import POIList from '../components/POIList'
import MyPOIList from '../components/MyPOIList'

class ItineraryHandler extends Component {
	render() {
		// Injected by connect() call:
		const { dispatch, selectedCity, POIs, MyPOIs, dragPOI } = this.props
		return (
			<div>
			{selectedCity.description}
			<POIList
				selectedCity={selectedCity}
				dragPOI={dragPOI}
				onLoad={ description =>
					dispatch(searchPOIs(description))
				}
				onDragStart = { (index, listType, data) =>
					dispatch(dragPOIStart(index, listType, data))
				}
				onDragEnd = { () =>
					dispatch(dragPOIEnd())
				}
				onDragOver = { (fromEl, toEl) =>
					dispatch(dragPOIMove(fromEl, toEl))
				}

				POIs={POIs}
			/>
			<MyPOIList
				dragPOI={dragPOI}
				onDragStart = { (index, listType, data) =>
					dispatch(dragPOIStart(index, listType, data))
				}
				onDragEnd = { () =>
					dispatch(dragPOIEnd())
				}
				onDragOver = { (fromEl, toEl) =>
					dispatch(dragPOIMove(fromEl, toEl))
				}

				MyPOIs={MyPOIs}
			/>
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
		selectedCity: state.selectedCity,
		POIs: state.POIs,
		MyPOIs: state.MyPOIs,
		dragPOI: state.dragPOI
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(getSelectedCity)(ItineraryHandler)
