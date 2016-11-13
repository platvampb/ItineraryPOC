import React, { Component, PropTypes } from 'react'

export default class LoadingBead extends Component {
	render() {
		let style = {
			WebkitAnimationDelay: (0.15*this.props.index) + "s",
			MozAnimationDelay: (0.15*this.props.index) + "s",
			animationDelay: (0.15*this.props.index) + "s",
		}
		return (
			<div className="bead"
			style={style}
			/>
		)
	}
}

LoadingBead.propTypes = {
	index: PropTypes.number.isRequired,
}
