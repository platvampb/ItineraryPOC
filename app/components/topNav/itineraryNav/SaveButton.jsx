import React, { Component, PropTypes } from 'react'

export default class SaveButton extends Component {
	render() {
		const { canSave, onClickHandler } = this.props
		const disabled = canSave ? "" : " disabled"
		return (
			<a
				className={"nav-button save-button" + disabled}
				onClick={ canSave ? onClickHandler : false }
			>
				<i className="glyphicon glyphicon-save"/>
				<div className="icon-text">Save</div>
			</a>
		)
	}
}

SaveButton.propTypes = {
	canSave: PropTypes.bool.isRequired,
	onClickHandler: PropTypes.func.isRequired,
}
