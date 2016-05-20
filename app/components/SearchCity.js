import React, { Component, PropTypes } from 'react'

export default class SearchCity extends Component {
	render() {
		return (
			<div>
				<input type='text' ref='input' id="search-city"
					//onKeyUp={(e) => this.handleKeyUp(e)}
					/>
				<button onClick={(e) => this.handleClick(e)}>
					Add
				</button>
			</div>
		)
	}

	handleClick(e) {
		const node = this.refs.input
		const text = node.value.trim()
		//this.props.onAddClick(text)
		node.value = ''
	}

	handleKeyUp(e) {
		const node = this.refs.input
		const text = node.value.trim()
		console.log(text)
		this.props.onSearchTrigger(text)
	}

	componentDidMount() {
		let autocomplete = initAutocomplete()
		autocomplete.addListener('place_changed', searchPOIs(autocomplete.getPlace()));
	}
}

function initAutocomplete() {
	return new google.maps.places.Autocomplete(
			(document.getElementById('search-city')),
			{types: ['cities']})
}

function searchPOIs(cityDetails) {

}

SearchCity.propTypes = {
	//onAddClick: PropTypes.func.isRequired
}
