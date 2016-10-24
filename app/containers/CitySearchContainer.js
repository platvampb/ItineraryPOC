require('../stylesheets/search.scss')

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changePageHeader } from '../actions/actions'
import { closeNextStep } from '../actions/searchbarActions'
import { requestTrip, tripRequestStates } from '../actions/itineraryActions'
import SearchCity from '../components/searchCity/SearchCity'
import Loading from '../components/searchCity/Loading'

class CitySearchHandler extends Component {
	constructor(props) {
		super(props)
		this.state = {
			torontoSample: false,
			dropdownVisible: false,
		}
	}

	componentWillMount() {
		this.props.dispatch(changePageHeader("Let's get started!"))
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.tripRequestState === tripRequestStates.REQUEST_DONE)
			this.context.router.push('/itinerary/' + nextProps.tripItinerary.id)
	}

	render() {
		// Injected by connect() call:
		const { dispatch, selectedCity,
			tripRequestState, cityPhoto, tripDuration } = this.props

		let divStyle = cityPhoto ? {
			backgroundImage: 'url(' + cityPhoto + ')',
		} : { opacity: '0' };

		let searchbarStateClass = () => {
			if (tripRequestState === tripRequestStates.REQUEST_IN_PROGRESS)
				return 'loading'
			if (tripRequestState === tripRequestStates.REQUEST_ERROR)
				return 'error'

			return ''
		}

		let containerClass = (() => {
			let className = ''
			if (this.state.torontoSample)
				className += ' sample'

			className += ' ' + searchbarStateClass()
			return className
		})()


		return (
			<div className={"search-outer-container" + containerClass}>
				<div className="search-background-hack" style={divStyle}/>
				<SearchCity
					selectedCity={selectedCity}
					dropdownVisible={this.state.dropdownVisible}
					onCloseNextStep={ () =>
						dispatch(closeNextStep())
					}
					onNextStep={ () =>
						dispatch(requestTrip(selectedCity.id, tripDuration))
					}
					showHideDropdown={ this.showHideDropdown.bind(this) }
					/>
				<Loading/>
				{this.props.children}
			</div>
		)
	}

	toggleDropdown(show) {
		this.setState({ dropdownVisible: !this.state.dropdownVisible })
	}

	showHideDropdown(show) {
		this.setState({ dropdownVisible: show })
	}
}

CitySearchHandler.contextTypes = {
	router: React.PropTypes.object.isRequired,
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
	return {
		selectedCity: state.selectedCity,
		cityPhoto: state.cityPhoto,
		tripRequestState: state.tripRequestState,
		tripItinerary: state.tripItinerary,
		tripDuration: state.tripDuration,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(CitySearchHandler)
