import React, { Component, PropTypes } from 'react'
import ItineraryPOI from './itineraryPOI'
import POIPreview from './POIPreview'

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
		window.console.log(this.state.offset)
		return (
			<div className="tab-content">
			<div className="tab-pane active" ref="tabPane">
			<POIPreview containerOffset={this.state.offset}/>
			{dayItinerary.map((poi, i) =>
				<ItineraryPOI
					key={poi.poi.id}
					id={poi.poi.id}
					poi={poi.poi}
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
	movePOI: PropTypes.func.isRequired,
}
