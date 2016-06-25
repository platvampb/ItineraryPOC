import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { searchPOIs, dragPOIStart, dragPOIEnd, dragPOIMove } from '../actions/actions'
import POIList from '../components/POIList'

class ItineraryHandler extends Component {
	render() {
		// Injected by connect() call:
		const { dispatch, selectedCity, POIs, myPOIs, dragPOI, cityPhoto } = this.props
		let divStyle = cityPhoto ? {
			backgroundImage: 'url(' + cityPhoto + ')'
		} : {};
		return (
			<div className="itinerary-container">
			<div className="panel-wrapper">
				<div className="panel" style={divStyle}/>
				<div className="header">Welcome to {selectedCity.description}!</div>
				<POIList
					listType='POI'
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
				<POIList
					listType='MyPOI'
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
					POIs={myPOIs}
				/>
			</div>
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
		myPOIs: state.myPOIs,
		dragPOI: state.dragPOI,
		targetPOI: state.targetPOI,
		cityPhoto: state.cityPhoto
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(getSelectedCity)(ItineraryHandler)
