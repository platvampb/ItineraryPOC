import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import searchIcon from '../assets/search.png'
import loadingIcon from '../assets/350.gif'
import SearchLabel from '../components/SearchLabel'
import { SearchbarStates } from '../actions/searchbarActions'

export default class SearchBar extends Component {
	componentDidUpdate() {
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

		let searchInput = (() => {
			return (
				<input type="text" ref="input" id="searchCity"
					placeholder="Search destination:"
					value={searchText}
					onChange={(e) => this.handleChange(e)}
					/>
			)
		})()

		let searchbarStyle = (() => {
			return (searchbarState === SearchbarStates.STICKY) ? {
				position: 'fixed',
			} : {}
		})

		return (
			<div
				className="searchbar"
				style={searchbarStyle()}
				onClick={(e) => this.handleLabelClick(e)}>
				<img src={searchIcon} alt="search" className="search-icon"></img>
				<img src={loadingIcon} alt="search" className="loading-icon"></img>
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

	handleFocus(e) {
		if (this.props.searchbarState === SearchbarStates.STICKY) this.props.onChangeSearchText('')
	}

	handleLabelClick(e) {
		const node = this.refs.input
		if (this.props.searchbarState === SearchbarStates.LOCKED || this.props.searchbarState === SearchbarStates.STICKY)
			this.props.onChangeSearchText(node.value)
	}
}

SearchBar.propTypes = {
	onSearchTrigger: PropTypes.func.isRequired,
	onChangeSearchText: PropTypes.func.isRequired,
	searchText: PropTypes.string.isRequired,
	selectedCity: PropTypes.shape({
		description: PropTypes.string,
	}),
	searchbarState: PropTypes.string.isRequired,
}
