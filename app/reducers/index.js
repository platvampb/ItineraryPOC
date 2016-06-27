import { combineReducers } from 'redux'
import cities from './cities'
import cityPhoto from './cityPhoto'
import citySearchState from './citySearchState'
import dragPOI from './dragPOI'
import myPOIs from './myPOIs'
import POIs from './POIs'
import searchText from './searchText'
import selectedCity from './selectedCity'

export default combineReducers({
	cities,
	cityPhoto,
	citySearchState,
	dragPOI,
	myPOIs,
	POIs,
	searchText,
	selectedCity,
})
//export default CitySearchApp
