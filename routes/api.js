var express = require('express');
var router = express.Router();
var request = require('request');

const key = "Key Goes Here!";
const host = "https://maps.googleapis.com";

router.get('/', function(req, res, next) {
	res.json({title: 'Who is there?'});
});

router.get('/api/cities', function(req, res, next) {
	var path = '/maps/api/place/autocomplete/json?' + 'key=' + key + '&input=' + req.query.input + '&types=(cities)';

	request(host+path, function(error, apiRes, body){
		var bodyObj = JSON.parse(body);
		res.json(bodyObj.predictions);
	});
});

module.exports = router;
