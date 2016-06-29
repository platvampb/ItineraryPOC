import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import searchIcon from '../assets/search.png'
import loadingIcon from '../assets/350.gif'

export default class SearchCity extends Component {
	componentDidUpdate() {
		this.refs.input.focus()
	}

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
			<div
				className="searchbar"
				onClick={(e) => this.handleLabelClick(e)}>
				<img src={searchIcon} alt="search" className="search-icon"></img>
				<img src={loadingIcon} alt="search" className="loading-icon"></img>
				<input type='text' ref='input' id="searchCity"
					placeholder="Search destination:"
					value={searchText}
					onChange={(e) => this.handleChange(e)}
					/>
				<label ref="label">
					{selectedCity.description}
				</label>
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
		if (this.props.sticky === 'sticky') this.props.onChangeSearchText('')
	}

	handleLabelClick(e) {
		const node = this.refs.input
		if (this.props.sticky === 'selected' || this.props.sticky === 'sticky')
			this.props.onChangeSearchText(node.value)
	}
}

SearchCity.propTypes = {
	onSearchTrigger: PropTypes.func.isRequired,
	onChangeSearchText: PropTypes.func.isRequired,
	searchText: PropTypes.string.isRequired,
}
