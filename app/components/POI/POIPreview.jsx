import React, { PropTypes } from 'react'
import DragLayer from 'react-dnd/lib/DragLayer'
import BackgroundImage from './BackgroundImage'

function collect (monitor) {
		return {
			item: monitor.getItem(),
			currentOffset: monitor.getSourceClientOffset(),
			isDragging: monitor.isDragging(),
			initialOffset: monitor.getInitialSourceClientOffset(),
		}
}


class POIPreview extends React.Component {
	render () {
		const { item } = this.props
		if (!this.props.isDragging) {
			return (<div></div>)
		}//this has to go first

		let hours = item.poi.poi.hoursOfVisit > 1 ? 'hours' : 'hour'

		let styleClass = ''
		if (item.poi.poi.photoUrls.length === 0) {
			styleClass += ' no-image'
		}

		return (
			<div
				style={this.getItemStyles()}
				className="poi-preview"
			>
				<div className="poi-bar-wrapper">
				<div className={"poi-bar" + styleClass}>

					<BackgroundImage poi={item.poi}/>
					<h3 className="poi-name">{item.name}</h3>
					<p className="cost">Visit for: {item.poi.poi.hoursOfVisit} {hours}</p>
				</div>
				</div>
			</div>
		)
	}


	getItemStyles () {
		let currentOffset = this.props.currentOffset
		let initialOffset = this.props.containerOffset
		if (!currentOffset) {
			return {
				display: 'block',
			}
		}

		var x = currentOffset.x - initialOffset.x
		var y = currentOffset.y - initialOffset.y
		var transform = `translate(${x}px, ${y}px)`

		return {
			pointerEvents: 'none',
			transform: transform,
			WebkitTransform: transform,
			color: 'black',
			zIndex: 999,
			position: 'fixed',
			opacity: 0.5,
			width: '680px',
			height: '150px',
			overflow: 'hidden',
		}
	}
}

POIPreview.propTypes = {
	id: React.PropTypes.number,
	currentOffset: React.PropTypes.shape({
		x: React.PropTypes.number,
		y: React.PropTypes.number,
	}),
	isDragging: React.PropTypes.bool,
	containerOffset: React.PropTypes.shape({
		x: React.PropTypes.number,
		y: React.PropTypes.number,
	}),
};

export default DragLayer(collect)(POIPreview);
