import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CitySearchStates, selectCity } from '../../actions/actions'
import City from './City'

class CityListContainer extends Component {

	render() {
		const { dispatch, cities, citySearchState } = this.props

		let hideClass = (() => {
			if (citySearchState === CitySearchStates.SEARCH_NONE)
				return 'hidden'

			return ''
		})()
		return (
			<div className={"city-list-wrapper " + hideClass}>
			<ul>
				{cities.map(city =>
					<City
						key={city.id}
						{...city}
						onClick={() => {
							dispatch(selectCity(city))
						}}
					/>
				)}
			</ul>
			</div>
		)
	}
}

function select(state) {
	return {
		cities: state.cities,
		citySearchState: state.citySearchState,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(CityListContainer)
