import { mallocApi } from '../config/config.js'

export function alternateClass(index) {
	return index % 2 === 1 ? "dark-bg" : ""
}

export function openNow(poi) {
	if (poi.opening_hours && poi.opening_hours.open_now)
		return true
	return false
}

export function parsePOIType(poi) {
	let type = poi.types[0];
	let tokens = type.split(/[\s-_]/g).map((token) => {
		return token.charAt(0).toUpperCase() + token.substr(1, token.length)
	})

	return tokens.join(' ')
}

export function getImageUrl(poi) {
	if (poi.photoUrls.length > 0)
		return mallocApi.cdnUrl + "/" + poi.photoUrls[0].url
	return ''
}
