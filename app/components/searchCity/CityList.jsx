import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectCity } from '../../actions/actions'
import { cities } from '../../config/cityDropdown'
import City from './City'

class CityListContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cities: cities,
		}
	}
	render() {
		const { dispatch, visible } = this.props

		let hideClass = (() => {
			if (!visible)
				return 'hidden'

			return ''
		})()

		return (
			<div className={"city-list-wrapper " + hideClass}>
			<ul>
				{this.state.cities.map((city, i) =>
					<City
						key={i}
						onSelectCity={ () => {
							dispatch(selectCity(city))
						}}
						{...city}
					/>
				)}
			</ul>
			</div>
		)
	}
}

CityListContainer.propTypes = {
	visible: PropTypes.bool.isRequired,
	toggleDropdown: PropTypes.func.isRequired,
}

// Wrap the component to inject dispatch and state into it
export default connect()(CityListContainer)
