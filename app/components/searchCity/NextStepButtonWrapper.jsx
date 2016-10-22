import React, { Component, PropTypes } from 'react'

export default class NextStepButtonWrapper extends Component {
	render() {
		const { validator } = this.props

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


NextStepButtonWrapper.propTypes = {
	validator: PropTypes.shape({
		errors: PropTypes.object.isRequired,
		valid: PropTypes.bool.isRequired,
	}).isRequired,
	handelNextStep: PropTypes.func.isRequired,
}
