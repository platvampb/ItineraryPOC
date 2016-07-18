import React, { Component } from 'react'
import { findDOMNode } from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { findPosRelativeToViewport } from '../utils/domHelpers'
import { scrollWindow } from '../actions/actions'

export default class AppHandler extends Component {
	componentDidMount () {
		window.addEventListener('scroll', this.onScroll, false);
	}

	componentWillUnmount () {
		window.removeEventListener('scroll', this.onScroll, false);
	}

	render() {
		// Injected by connect() call:
		const { selectedCity, cityPhoto } = this.props

		let fetchingPhoto = ((selectedCity, cityPhoto) => {
			return (selectedCity.id && !selectedCity.photo)
		})(selectedCity, cityPhoto)

		let divStyle = cityPhoto ? {
			backgroundImage: 'url(' + cityPhoto + ')',
			opacity: fetchingPhoto ? '0' : '1',
		} : { opacity: '0' };

		return (
			<div className="app-container">
				<div className="search-background-hack" style={divStyle}/>
			<ReactCSSTransitionGroup
				transitionName="example"
				transitionEnterTimeout={1000}
				transitionLeaveTimeout={1000}
			>
				{React.cloneElement(this.props.children, {
					key: this.props.location.pathname,
				})}
			</ReactCSSTransitionGroup>
			</div>
		)
	}
}

function onScroll() {
	scrollWindow(findDOMNode(this))
	var pos = findPosRelativeToViewport(findDOMNode(this));

	if (pos[1]<=this.props.offsetTop){
			this.setState({fix: true});
	} else {
			this.setState({fix: false});
	}
}

function select(state) {
	return {
		selectedCity: state.selectedCity,
		cityPhoto: state.cityPhoto,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(AppHandler)
