var express = require('express'),
	router = express.Router(),
	Promise = require("bluebird"),
	request = Promise.promisify(require('request')),
	fs = Promise.promisifyAll(require('fs'));

const key = "AIzaSyBafQ3H7ZXVGqbh8Z9Z3h27wQzniA64CJI";
const host = "https://maps.googleapis.com";

var inMemCache = {};//keep a record for all downloaded images, obviously we can't keep this up for long

router.get('/', function(req, res, next) {
	res.json({title: 'Who is there?'});
});

router.get('/api/cities', function(req, res, next) {
	var path = '/maps/api/place/autocomplete/json?' + 'key=' + key + '&input=' + req.query.input + '&types=(cities)';

	request(host+path, function(error, apiRes, body){
		var bodyObj = JSON.parse(body);
		res.json(bodyObj.predictions);
		//res.json(tempBody.predictions);
	});
});

router.get('/api/POIs', function(req, res, next) {
	var path = '/maps/api/place/textsearch/json?' + 'key=' + key + '&query=tourist attraction near ' + req.query.description;
	var photo_path = '/maps/api/place/photo?maxwidth=480&' + 'key=' + key;

	request(host+path, function(error, apiRes, body){
		var bodyObj = JSON.parse(body);

		bodyObj.results.filter(function(place) {
		//bodyTemp.results.filter(function(place) {
			if (place.types.indexOf('travel_agency') == -1)
				return true;
		});
		Promise.map(bodyObj.results, function(place) {
			// Promise.map awaits for returned promises as well.
			if (place.photos) {
				return new Promise(function(resolve, reject){
					requestPhoto(place.photos[0].photo_reference, '400')
					.then(function(img_path){
						place.thumbnail_path = img_path;
						resolve();
					});
				});
			}
		}).then(function() {
			res.json(bodyObj);
			console.log(bodyObj);
		});
		//res.json(bodyTemp);
	});
});

function requestPhoto(photoReference, maxWidth) {
	var path = '/maps/api/place/photo?photoreference=' + photoReference + '&maxwidth=' + maxWidth + '&key=' + key;

	var img_path = "";

	return new Promise(function(resolve, reject){
		if (inMemCache[photoReference]) {
			resolve(inMemCache[photoReference]);
		} else {
			request({
				url : host+path,
				encoding: null
			})
			.then(function(apiRes){
				console.log('content-type:', apiRes.headers['content-type']);
				var contentType = apiRes.headers['content-type'];
				var ext = contentType.substring(contentType.indexOf('/') + 1, contentType.length);
				img_path = 'poi_images/' + photoReference + "." + ext;
				return fs.writeFileAsync('./public/' + img_path, apiRes.body);
			})
			.then(function(error){
				if (error) {
					reject(error);
				}
				inMemCache[photoReference] = img_path;
				resolve(img_path);
			});
		}
	});
};

function requestPlaceDetail(placeId) {
	var path = '/maps/api/place/details/json?placeid=' + placeId + '&key=' + key;

	var img_path = "";

	return new Promise (function(resolve, reject){
		request(host+path)
		.then(function(apiRes){
			resolve(JSON.parse(apiRes.body).result);
		});
	});
};

router.get('/api/photo', function(req, res, next) {
	var getPhotoReference = new Promise (function(resolve, reject){
		if (req.query.photo_reference) {
			resolve(req.query.photo_reference);
		} else {
			requestPlaceDetail(req.query.place_id)
			.then(function(place){
				if (place.photos)
					resolve(place.photos[0].photo_reference)
				else
					resolve('')
			});
		}
	});

	getPhotoReference
	.then(function(photo_reference){
		if (photo_reference != '') {
			requestPhoto(photo_reference, req.query.max_width)
			.then(function(img_path){
				res.json({img_path: img_path});
			})
		} else {
			res.json({img_path: ''});
		}
	})
	.catch(function(error) {
		console.log(error);
	});
	res.json({img_path: ''})
});

module.exports = router;
