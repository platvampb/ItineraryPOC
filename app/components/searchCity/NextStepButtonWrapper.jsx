import React, { Component } from 'react'
import { Link } from 'react-router'

export default class NextStepButtonWrapper extends Component {
	render() {
		let manualButton = (() => {
			return (
				<div className="btn-wrapper">
				<Link to={`/places`} type="button" className="btn manual btn-info">
					<span>I will do it myself >></span>
				</Link>
				</div>
			)
		})()
		let autoButton = (() => {
			return (
				<div className="btn-wrapper">
				<Link to={`/itinerary`} type="button" className="btn auto btn-primary">
					<span >Generate a trip for me >></span>
				</Link>
				</div>
			)
		})()

		return (
			<div className="next-step-buttons-wrapper">
				{autoButton}
				{manualButton}
			</div>
		)
	}
}
