import { combineReducers } from 'redux'
import cityPhoto from './cityPhoto'
import citySearchState from './citySearchState'
import searchbarState from './searchbarState'
import searchText from './searchText'
import selectedCity from './selectedCity'
import tripItinerary from './tripItinerary'
import tripRequestState from './tripRequestState'
import activeDay from './activeDay'
import tripDuration from './tripDuration'
import pageHeader from './pageHeader'

export default combineReducers({
	cityPhoto,
	citySearchState,
	searchText,
	selectedCity,
	searchbarState,
	tripItinerary,
	tripRequestState,
	activeDay,
	tripDuration,
	pageHeader,
})
//export default CitySearchApp
