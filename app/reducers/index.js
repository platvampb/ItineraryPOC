import { combineReducers } from 'redux'
import selectedCity from './selectedCity'
import tripItinerary from './tripItinerary'
import tripRequestState from './tripRequestState'
import activeDay from './activeDay'
import tripDuration from './tripDuration'
import pageHeader from './pageHeader'
import user from './user'

export default combineReducers({
	selectedCity,
	tripItinerary,
	tripRequestState,
	activeDay,
	tripDuration,
	pageHeader,
	user,
})
//export default CitySearchApp
