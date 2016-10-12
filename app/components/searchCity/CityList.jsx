import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CitySearchStates, selectCity } from '../../actions/actions'
import City from './City'

class CityListContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cities: [
				{
					description: 'Canada',
					selectable: false,
				},
				{
					description: 'Toronto',
					selectable: true,
					id: '4089',
				},
				{
					description: 'Vancouver',
					selectable: true,
					id: '4106',
				},
				{
					description: 'Montreal',
					selectable: true,
					id: '4005',
				},
				{
					description: '...more coming soon!',
					selectable: false,
					id: '-1',
				},
			],
		}
	}
	render() {
		const { dispatch, visible, toggleDropdown } = this.props

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

function select(state) {
	return {
		citySearchState: state.citySearchState,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(CityListContainer)
