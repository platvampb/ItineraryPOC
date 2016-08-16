import { combineReducers } from 'redux'
import selectedCity from './selectedCity'
import tripItinerary from './tripItinerary'
import tripRequestState from './tripRequestState'
import activeDay from './activeDay'

export default combineReducers({
	selectedCity,
	tripItinerary,
	tripRequestState,
	activeDay,
})
//export default CitySearchApp
