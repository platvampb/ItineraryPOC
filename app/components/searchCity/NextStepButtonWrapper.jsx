import React, { Component } from 'react'
import { Link } from 'react-router'

export default class NextStepButtonWrapper extends Component {
	render() {
		const { validator, setValid } = this.props

		let autoButton = (() => {
			let disabled = validator.valid ? '' : ' disabled'
			return (
				<a type="button"
					className={"btn auto btn-primary" + disabled}
					disabled={disabled}
					onClick={this.props.handelNextStep}
				>
					<span>Generate trip</span>
				</a>
			)
		})()

		return (
			<div className="btn-wrapper generate">
				{autoButton}
			</div>
		)
	}
}
