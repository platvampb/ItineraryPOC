import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

export default class AppHandler extends Component {
	render() {
		// Injected by connect() call:
		const { dispatch, selectedCity, cityPhoto } = this.props

		let fetchingPhoto = ((selectedCity, cityPhoto) => {
			return (selectedCity.id && !selectedCity.photo)
		})(selectedCity, cityPhoto)

		let divStyle = cityPhoto ? {
			backgroundImage: 'url(' + cityPhoto + ')',
			opacity: fetchingPhoto ? '0' : '1'
		} : {
			opacity: '0'
		};

		return (
			<div className="app-container">
				<div className="search-background-hack" style={divStyle}/>
			<ReactCSSTransitionGroup
				transitionName="example"
				transitionEnterTimeout={1000}
				transitionLeaveTimeout={1000}
			>
				{React.cloneElement(this.props.children, {
					key: this.props.location.pathname
				})}
			</ReactCSSTransitionGroup>
			</div>
		)
	}
}

AppHandler.propTypes = {
	/*
	visibleTodos: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired
	}).isRequired).isRequired*/
}

function select(state) {
	return {
		selectedCity: state.selectedCity,
		cityPhoto: state.cityPhoto
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(AppHandler)
