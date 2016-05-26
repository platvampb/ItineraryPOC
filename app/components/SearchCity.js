import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class SearchCity extends Component {
	render() {
		let selectCityButton = (() => {
			if (this.props.selectedCity.hasOwnProperty('description')) {
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
