import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import searchIcon from '../../assets/search.png'
import loadingIcon from '../../assets/350.gif'
import SearchLabel from './SearchLabel'
import { SearchbarStates } from '../../actions/searchbarActions'

export default class SearchBar extends Component {
	componentDidUpdate() {
		if (this.refs.input)
			this.refs.input.focus()
	}

	render() {
		const { searchText, selectedCity, searchbarState } = this.props
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
			return ""
		})()

		let hideSearchInput = (() => {
			return searchbarState === SearchbarStates.READ_ONLY
		})

		let searchInput = (() => {
			return (
				<input type="text" ref="input" id="searchCity"
					placeholder="Search destination:"
					value={searchText}
					onChange={(e) => this.handleChange(e)}
					/>
			)
		})()

		return (
			<div
				className="searchbar"
				onClick={(e) => this.handleLabelClick(e)}>
				<img src={searchIcon} alt="search" className="search-icon"></img>
				<img src={loadingIcon} alt="loading" className="loading-icon"></img>
				{searchInput}
				<SearchLabel
					selectedCity={selectedCity}
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

	handleLabelClick(e) {
		const node = this.refs.input
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
