import React, { Component, PropTypes } from 'react'

export default class City extends Component {
	render() {

		let highlightSearchResult = function(city) {
			let desc = city.name.toLowerCase(),
				name = city.name,
				searchText = city.searchText,
				tokens = {}

			var	matchStart = desc.indexOf(searchText)

			return (
				<span>
					{name.substring(0, matchStart)}
					<b>{name.substring(matchStart, matchStart + searchText.length)}</b>
					{name.substring(matchStart + searchText.length)}
				</span>
			)
		}

		return (
			<li onClick={this.props.onClick}>
				{ highlightSearchResult(this.props) }
			</li>
		)
	}
}

City.propTypes = {
	onClick: PropTypes.func.isRequired,
	searchText: PropTypes.string.isRequired,
}
