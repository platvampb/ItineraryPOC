import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class SearchCity extends Component {
	render() {
		let selectCityButton;
		if (this.props.selectedCity.hasOwnProperty('description')) {
			selectCityButton = (
				<Link to={`/places`}>
					Go there!
				</Link>)
		}

		return (
			<div>
				<input type='text' ref='input' id="search-city"
					placeholder="Enter a place you fancy:"
					value={this.props.searchText}
					onChange={(e) => this.handleChange(e)}
					/>
				{selectCityButton}
			</div>
		)
	}

	handleClick(e) {
		const node = this.refs.input
		const text = node.value.trim()
		//this.props.onAddClick(text)
		node.value = ''
	}

	handleChange(e) {
		const node = this.refs.input
		const text = node.value.trim()

		this.props.onChangeSearchText(text)
		if (text.length > 2) {
			this.props.onSearchTrigger(text)
		}
	}

}

SearchCity.propTypes = {
	onSearchTrigger: PropTypes.func.isRequired,
	onChangeSearchText: PropTypes.func.isRequired,
	searchText: PropTypes.string.isRequired
}
