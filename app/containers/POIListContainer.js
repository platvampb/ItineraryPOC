require('../stylesheets/POIList.scss')

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchPOIs, dragPOIStart, dragPOIEnd, dragPOIMove } from '../actions/actions'
import POIListWrapper from '../components/POI/POIListWrapper'

class POIListHandler extends Component {
	render() {
		// Injected by connect() call:
		const { dispatch, selectedCity, POIs, dragPOI } = this.props
		return (
			<div className="itinerary-container">
			<div className="panel-wrapper">
				<div className="header">Welcome to {selectedCity.description}!</div>
				<POIListWrapper
					selectedCity={selectedCity}
					dragPOI={dragPOI}
					onLoad={description =>
						dispatch(searchPOIs(description))
					}
					onDragStart = {(index, listType, data) =>
						dispatch(dragPOIStart(index, listType, data))
					}
					onDragEnd = {() =>
						dispatch(dragPOIEnd())
					}
					onDragOver = {(fromEl, toEl) =>
						dispatch(dragPOIMove(fromEl, toEl))
					}
					POIs={POIs}
				/>
			</div>
			</div>
		)
	}
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function getSelectedCity(state) {
	return {
		selectedCity: state.selectedCity,
		POIs: state.POIs,
		dragPOI: state.dragPOI,
		targetPOI: state.targetPOI,
		cityPhoto: state.cityPhoto,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(getSelectedCity)(POIListHandler)
