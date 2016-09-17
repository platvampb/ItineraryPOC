import React, { Component, PropTypes } from 'react'

export default class Timeline extends Component {
	render() {
		const { addClass } = this.props

		return (
			<div className={"timeline" + (addClass ? (" " + addClass) : "")}/>
		)
	}
}
