import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class SearchCity extends Component {
	render() {
		const { searchText, selectedCity } = this.props
		let selectCityButton = (() => {
			if ({}.hasOwnProperty.call(selectedCity, 'photo')) {
				return (
					<div className="go-button">
					<Link to={`/places`}>
						Let's go!
						<span className="glyphicon glyphicon-chevron-right"/>
					</Link>
					</div>
				)
			}
			return ''
		})()


		return (
			<div className="searchbar">
				<input type='text' ref='input' id="searchCity"
					placeholder="Enter a place you fancy:"
					value={searchText}
					onChange={(e) => this.handleChange(e)}
					/>
				{selectCityButton}
			</div>
		)
	}

	handleChange(e) {
		const node = this.refs.input
		const text = node.value.trim()

		this.props.onChangeSearchText(node.value)
		if (text.length > 2) {
			this.props.onSearchTrigger(text)
		}
	}

}

SearchCity.propTypes = {
	onSearchTrigger: PropTypes.func.isRequired,
	onChangeSearchText: PropTypes.func.isRequired,
	searchText: PropTypes.string.isRequired,
}
