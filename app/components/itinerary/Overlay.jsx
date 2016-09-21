import React, { Component, PropTypes } from 'react'
import closeButton from "../../assets/close-button.png"


export default class Overlay extends Component {
	render() {
		const { closeHandler } = this.props

		return (
			<div className="overlay">
				{this.props.children}
				<div className="bottom-menu">
					<a className="close" onClick={closeHandler}>
						<img src={closeButton}/>
					</a>
				</div>
			</div>
		)
	}
}
