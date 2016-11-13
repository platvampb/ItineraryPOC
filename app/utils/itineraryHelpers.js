export function diffTrips(tripBefore, tripAfter) {
	let daysBefore = tripBefore.destinations,
		daysAfter = tripAfter.destinations

	if (daysBefore.length !== daysAfter.length)
		return true

	for (let i = 0, len = daysBefore.length; i < len; i++)
		if (diffDayItineraries(daysBefore[i], daysAfter[i]))
			return true
}

function diffDayItineraries(dayBefore, dayAfter) {
	if (dayBefore.length !== dayAfter.length)
		return true

	for (let i = 0, len = dayBefore.length; i < len; i++)
		if (diffPOI(dayBefore[i], dayAfter[i]))
			return true
}

function diffPOI(POIBefore, POIAfter) {
	return POIBefore.poi.id !== POIAfter.poi.id
}

export function parseTripToEdit(trip) {
	//TODO: Fix malloc api so frontend don't have to do this ugly massaging
	let edit = {
		cmd: "edit destination",
		data: {
			trip_id: trip.id.toString(),
		},
	}

	let destinations = []

	for (let tripDay of trip.destinations)
		for (let i = 0; i < tripDay.length; i ++) {
			const { id: destination_id, day, poi: { id: poi_id } } = tripDay[i]

			destinations.push({
				destination_id: destination_id.toString(),
				day: day.toString(),
				poi_id: poi_id.toString(),
				order: i.toString(),
			})
		}

	edit.data.destinations = destinations

	return JSON.stringify(edit)
}
