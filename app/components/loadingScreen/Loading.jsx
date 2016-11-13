require('../../stylesheets/loadingScreen.scss')

import React, { Component, PropTypes } from 'react'
import LoadingBead from './LoadingBead'

export default class Loading extends Component {
	constructor(props) {
		super(props)

		this.state = { display: "hidden" }
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.state === this.props.state)
			return

		if (nextProps.state.match(/^(hidden|error|done|loading)$/))
			this.setState({ display: nextProps.state })

		if (nextProps.state === "error" || nextProps.state === "done")
			setTimeout(() => {//animation stuff
				this.setState({ display: "leaving" })
				setTimeout(() => {
					this.setState({ display: "hidden" })
				}, 180)
			}, 1500)
	}

	render() {
		const { message } = this.props
		const { display } = this.state

		let beads = []
		if (display === "loading") {
			for (var i = 0; i < 9; i++) {
				beads.push(<LoadingBead key={i} index={i}/>)
			}
		}

		return (
			<div className={"loading-screen " + display}>
				<div className="loading-content">
					<h2 className={"loading-message"}>
						{message}
					</h2>
					{beads || ""}
				</div>
			</div>
		)
	}
}

Loading.propTypes = {
	message: PropTypes.string.isRequired,
	state: PropTypes.string.isRequired,
}
