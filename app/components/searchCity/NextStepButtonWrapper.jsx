import React, { Component } from 'react'
import { Link } from 'react-router'
import Duration from './Duration.jsx'

export default class NextStepButtonWrapper extends Component {
	render() {
		const { validator, setValid } = this.props

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
			let disabled = validator.valid ? '' : ' disabled'
			return (
				<div className="btn-wrapper">
				<a type="button"
					className={"btn auto btn-primary" + disabled}
					disabled={disabled}
					onClick={this.props.handelNextStep}
				>
					<span>Generate trip</span>
				</a>
				</div>
			)
		})()
		/*
		let durationField = (() => {
			return (
				<Duration
					validator={validator}
					setValid={setValid}
				/>
			)
		})()*/

		return (
			<div className="next-step-buttons-wrapper">
				<Duration
					validator={validator}
					setValid={setValid}
				/>
				{autoButton}
			</div>
		)
	}
}
