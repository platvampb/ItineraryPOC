import React, { Component, PropTypes } from 'react'

export default class City extends Component {
	render() {

		let highlightSearchResult = function(city) {
			let desc = city.description,
				tokens = []

			var	noMatchStart = 0

			for (var match of city.matched_substrings) {
				tokens.push( desc.substring(noMatchStart, match.offset) )
				tokens.push( <b key={match.offset}>{desc.substr(match.offset, match.length)}</b> )

				noMatchStart = match.offset + match.length
			}

			if (noMatchStart < desc.length) {
				tokens.push( desc.substring(noMatchStart, desc.length) )
			}

			return tokens
		}

		return (
			<li onClick={this.props.onClick}>
				{ highlightSearchResult(this.props) }
			</li>
		)
	}
}

City.propTypes = {
	description: PropTypes.string.isRequired
}
