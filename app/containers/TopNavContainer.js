import React, { Component } from 'react'
import { connect } from 'react-redux'

import BackButton from '../components/topNav/BackButton'
import UserNavContainer from '../components/topNav/UserNavContainer'
import ItineraryNavContainer from '../components/topNav/itineraryNav/ItineraryNavContainer'

class TopNavContainer extends Component {
	render() {
		return (
			<div className="top-nav row">
				<div className="col-sm-10 col-sm-offset-1 col-xs-12">
					<UserNavContainer
						pathname={this.props.curPage}
					/>
					<BackButton
						pathname={this.props.curPage}
					/>

					<ItineraryNavContainer/>
					<div className="header">
						<img src="https://www.wewherego.com/img/logo/logo_wherego.png"/>
						<h1>{this.props.pageHeader}</h1>
					</div>
				</div>
			</div>
		)
	}
}

function select(state) {
	return {
		user: state.user,
		pageHeader: state.pageHeader,
	}
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(TopNavContainer)
