import React, { Component, PropTypes } from 'react'
import ItineraryPOI from '../POI/itineraryPOI'

export default class DayItinerary extends Component {
	constructor(props) {
		super(props)

		this.state = {
			offset: {
				x: 0,
				y: 0,
			},
		}
	}

	componentDidMount() {
		let offset = this.refs.tabPane.getBoundingClientRect()
		this.setState({
			offset: {
				x: offset.left,
				y: offset.top,
			},
		})
	}

	render() {
		const { dayItinerary, movePOI } = this.props
		return (
			<div className="tab-content">
			<div className="tab-pane active" ref="tabPane">
			{dayItinerary.map((poi, i) =>
				<ItineraryPOI
					key={poi.poi.id}
					id={poi.poi.id}
					poi={poi}
					index={i}
					movePOI={movePOI}
					day={poi.day}
				/>
			)}
			</div>
			</div>
		)
	}
}

DayItinerary.propTypes = {
	dayItinerary: PropTypes.array.isRequired,
}
