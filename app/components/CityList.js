import React, { Component, PropTypes } from 'react'
import { CitySearchStates } from '../actions/actions'
import City from './City'

export default class CityList extends Component {

	render() {
		let hideClass = (() => {
			if (this.props.citySearchState == CitySearchStates.SEARCH_NONE)
				return 'hidden'

			return ''
		})()

		return (
			<ul className={"city-list " + hideClass}>
				{this.props.Cities.map(city =>
					<City
						key={city.id}
						{...city}
						onClick={() => this.props.onCityClick(city)}
					/>
				)}
			</ul>
		)
	}
}

CityList.propTypes = {
	onCityClick: PropTypes.func.isRequired,
	Cities: PropTypes.arrayOf(PropTypes.shape({
		description: PropTypes.string.isRequired,
	}).isRequired).isRequired
}
