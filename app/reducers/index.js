import { combineReducers } from 'redux'
import cities from './cities'
import cityPhoto from './cityPhoto'
import citySearchState from './citySearchState'
import searchbarState from './searchbarState'
import dragPOI from './dragPOI'
import myPOIs from './myPOIs'
import POIs from './POIs'
import searchText from './searchText'
import selectedCity from './selectedCity'
import tripItinerary from './tripItinerary'
import tripRequestState from './tripRequestState'
import activeDay from './activeDay'

export default combineReducers({
	cities,
	cityPhoto,
	citySearchState,
	dragPOI,
	myPOIs,
	POIs,
	searchText,
	selectedCity,
	searchbarState,
	tripItinerary,
	tripRequestState,
	activeDay,
})
//export default CitySearchApp
