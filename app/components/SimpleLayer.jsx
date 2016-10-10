import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class SimpleLayer extends Component {
	componentWillMount() {
		this.layerElement = document.createElement('div')
	}

	componentDidMount() {
		document.body.appendChild(this.layerElement)
		this.rerender()
	}

	componentWillUnmount() {
		document.body.removeChild(this.layerElement)
	}

	componentDidUpdate() {
		this.rerender()
	}

	rerender() {
		// TODO: cloneWithProps()? context?
		ReactDOM.render(
			React.DOM.div(this.props, this.props.children),
			this.layerElement
		)
	}

	render() {
		return <span /> //This is a stub
	}
}
