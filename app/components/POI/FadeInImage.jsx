import React, { Component, PropTypes } from 'react'

export default class FadeInImage extends Component {
	constructor(props) {
		super(props);
		this.state = { loadingStatus: 'loading' };
	}

	handleImageLoaded() {
		this.setState({ loadingStatus: 'loaded' });
	}

	render() {
		const { src, className} = this.props
		return (
				<img
					className={className + ' ' + this.state.loadingStatus}
					src={src}
					onLoad={this.handleImageLoaded.bind(this)}
				/>
		)
	}
}

FadeInImage.propTypes = {
	src: PropTypes.string.isRequired,
	className: PropTypes.string,
}
