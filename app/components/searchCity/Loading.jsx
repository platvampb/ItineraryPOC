require('../../stylesheets/loadingScreen.scss')

import React, { Component } from 'react'
import LoadingBead from './LoadingBead'

export default class Loading extends Component {
	render() {
		let beads = []
		for (var i = 0; i < 9; i++) {
			beads.push(<LoadingBead key={i} index={i}/>)
		}
		return (
			<div className="loading-screen">
				<h2 className="loading-message">
					Heavy lifting in progress...
				</h2>
				{beads}
			</div>
		)
	}
}
