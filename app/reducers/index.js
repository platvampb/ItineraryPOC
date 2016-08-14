import { combineReducers } from 'redux'
import cityPhoto from './cityPhoto'
import selectedCity from './selectedCity'
import tripItinerary from './tripItinerary'
import tripRequestState from './tripRequestState'
import activeDay from './activeDay'

export default combineReducers({
	cityPhoto,
	selectedCity,
	tripItinerary,
	tripRequestState,
	activeDay,
})
//export default CitySearchApp
