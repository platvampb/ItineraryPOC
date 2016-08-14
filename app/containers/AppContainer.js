import React, { Component } from 'react'
import { connect } from 'react-redux'

export default class AppHandler extends Component {

	render() {
		return (
			<div className="app-container">
				{this.props.children}
			</div>
		)
	}
}

function select(state) {
	return {
		selectedCity: state.selectedCity,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(AppHandler)
