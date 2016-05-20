import React, { Component, PropTypes } from 'react'

export default class POI extends Component {
	render() {
		return (
			<li>
				{this.props.text}
			</li>
		)
	}
}

POI.propTypes = {
	text: PropTypes.string.isRequired,
}
