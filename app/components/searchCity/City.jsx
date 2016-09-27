import React, { Component, PropTypes } from 'react'

export default class City extends Component {

	render() {

		if (this.props.selectable)
			return (
				<li
				onMouseDown={this.props.onSelectCity}
				//TODO:Add keydown event for accessibility
				className={'selectable'}
				ref='option'
				>
					{ this.props.description }
				</li>
			)

		return (
			<li ref='option'>
				{ this.props.description }
			</li>
		)
	}
}

City.propTypes = {
	onSelectCity: PropTypes.func.isRequired,
}
