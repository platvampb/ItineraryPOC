import React, { Component, PropTypes } from 'react'

import CityList from './CityList'
import searchIcon from '../../assets/search.png'
import loadingIcon from '../../assets/350.gif'
import SearchLabel from './SearchLabel'

export default class SearchBar extends Component {
	componentDidUpdate() {
		if (this.refs.input)
			this.refs.input.focus()
	}

	render() {
		const { searchText, selectedCity, onCloseNextStep } = this.props

		let searchInput = (() => {
			return (
				<input type="text" required ref="destination" id="searchCity"
					value={searchText}
					onChange={(e) => this.handleChange(e)}
				/>
			)
		})()

		return (
			<div className="searchbar group">
				<img src={searchIcon} alt="search" className="search-icon"></img>
				<img src={loadingIcon} alt="loading" className="loading-icon"></img>
				{searchInput}
				<label className="placeholder">Search destination:</label>
				<span className="bar"></span>
				<SearchLabel
					selectedCity={selectedCity}
					closeHandler={onCloseNextStep}
				/>
				<CityList/>
			</div>
		)
	}

	handleChange(e) {
		const node = this.refs.destination
		const text = node.value.trim()

		this.props.onChangeSearchText(node.value)
		if (text.length > 2) {
			this.props.onSearchTrigger(text)
		}
	}

	handleLabelClick() {
		const node = this.refs.destination
		this.props.onChangeSearchText(node.value)
	}
}

SearchBar.propTypes = {
	onSearchTrigger: PropTypes.func.isRequired,
	onChangeSearchText: PropTypes.func.isRequired,
	searchText: PropTypes.string.isRequired,
	searchbarState: PropTypes.string.isRequired,
	selectedCity: PropTypes.shape({
		description: PropTypes.string,
	}).isRequired,
}
