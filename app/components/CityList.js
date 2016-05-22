import React, { Component, PropTypes } from 'react'
import City from './City'

export default class CityList extends Component {
	render() {
		return (
			<ul>
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
