import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { tripSaveStates, saveTrip } from '../../../actions/itineraryActions'
import SaveButton from './SaveButton'
import { diffTrips } from '../../../utils/itineraryHelpers'

class ItineraryNavContainer extends Component {
	constructor(props) {
		super(props)

		this.state = { canSave: false }
	}

	componentWillReceiveProps(nextProps) {
		//TODO: add a reducer tracking user change. E.g. on dropped
		if (this.props.tripSaveState === tripSaveStates.REQUEST_IN_PROGRESS) {
			this.setState({ canSave: false })
			return
		}
		if (this.props.tripSaveState === tripSaveStates.REQUEST_ERROR) {
			this.setState({ canSave: true })
			return
		}
		if (this.props.tripItinerary.id &&
				diffTrips(this.props.tripItinerary, nextProps.tripItinerary))
			this.setState({ canSave: true })
	}

	render() {
		return (
			<div className="itinerary-nav">
				<SaveButton
					canSave={this.state.canSave}
					onClickHandler={this.saveTripHandler.bind(this)}
				/>
			</div>
		)
	}

	saveTripHandler() {
		this.props.dispatch(saveTrip(this.props.tripItinerary))
	}
}

/*
ItineraryNavWrapper.propTypes = {
}*/
function select(state) {
	return {
		tripItinerary: state.tripItinerary,
		tripSaveState: state.tripSaveState,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ItineraryNavContainer)
