var express = require('express'),
	router = express.Router(),
	Promise = require("bluebird"),
	request = Promise.promisify(require('request')),
	fs = Promise.promisifyAll(require('fs'));


router.get('/', function(req, res, next) {
	res.json({title: 'Who is there?'});
});

router.get('/api/cities', function(req, res, next) {

	var body = {
	  "status": "OK",
	  "predictions" : [
	      {
		 "description" : "Paris, France",
		 "id" : "691b237b0322f28988f3ce03e321ff72a12167fd",
		 "matched_substrings" : [
		    {
		       "length" : 5,
		       "offset" : 0
		    }
		 ],
		 "place_id" : "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
		 "reference" : "CjQlAAAA_KB6EEceSTfkteSSF6U0pvumHCoLUboRcDlAH05N1pZJLmOQbYmboEi0SwXBSoI2EhAhj249tFDCVh4R-PXZkPK8GhTBmp_6_lWljaf1joVs1SH2ttB_tw",
		 "terms" : [
		    {
		       "offset" : 0,
		       "value" : "Paris"
		    },
		    {
		       "offset" : 7,
		       "value" : "France"
		    }
		 ],
		 "types" : [ "locality", "political", "geocode" ]
	      },
	      {
		 "description" : "Paris Avenue, Earlwood, New South Wales, Australia",
		 "id" : "359a75f8beff14b1c94f3d42c2aabfac2afbabad",
		 "matched_substrings" : [
		    {
		       "length" : 5,
		       "offset" : 0
		    }
		 ],
		 "place_id" : "ChIJrU3KAHG6EmsR5Uwfrk7azrI",
		 "reference" : "CkQ2AAAARbzLE-tsSQPgwv8JKBaVtbjY48kInQo9tny0k07FOYb3Z_z_yDTFhQB_Ehpu-IKhvj8Msdb1rJlX7xMr9kfOVRIQVuL4tOtx9L7U8pC0Zx5bLBoUTFbw9R2lTn_EuBayhDvugt8T0Oo",
		 "terms" : [
		    {
		       "offset" : 0,
		       "value" : "Paris Avenue"
		    },
		    {
		       "offset" : 14,
		       "value" : "Earlwood"
		    },
		    {
		       "offset" : 24,
		       "value" : "New South Wales"
		    },
		    {
		       "offset" : 41,
		       "value" : "Australia"
		    }
		 ],
		 "types" : [ "route", "geocode" ]
	      },
	      {
		 "description" : "Paris Street, Carlton, New South Wales, Australia",
		 "id" : "bee539812eeda477dad282bcc8310758fb31d64d",
		 "matched_substrings" : [
		    {
		       "length" : 5,
		       "offset" : 0
		    }
		 ],
		 "place_id" : "ChIJCfeffMi5EmsRp7ykjcnb3VY",
		 "reference" : "CkQ1AAAAAERlxMXkaNPLDxUJFLm4xkzX_h8I49HvGPvmtZjlYSVWp9yUhQSwfsdveHV0yhzYki3nguTBTVX2NzmJDukq9RIQNcoFTuz642b4LIzmLgcr5RoUrZhuNqnFHegHsAjtoUUjmhy4_rA",
		 "terms" : [
		    {
		       "offset" : 0,
		       "value" : "Paris Street"
		    },
		    {
		       "offset" : 14,
		       "value" : "Carlton"
		    },
		    {
		       "offset" : 23,
		       "value" : "New South Wales"
		    },
		    {
		       "offset" : 40,
		       "value" : "Australia"
		    }
		 ],
		 "types" : [ "route", "geocode" ]
	      }
	  ]
	};
	res.json(body.predictions);
});

router.get('/api/POIs', function(req, res, next) {
	var body = {
	   "html_attributions" : [],
	   "results" : [
	      {
		 "geometry" : {
		    "location" : {
		       "lat" : -33.870775,
		       "lng" : 151.199025
		    }
		 },
		 "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/travel_agent-71.png",
		 "id" : "21a0b251c9b8392186142c798263e289fe45b4aa",
		 "name" : "Rhythmboat Cruises",
		 "opening_hours" : {
		    "open_now" : true
		 },
		 "photos" : [
		    {
		       "height" : 270,
		       "html_attributions" : [],
		       "photo_reference" : "CnRnAAAAF-LjFR1ZV93eawe1cU_3QNMCNmaGkowY7CnOf-kcNmPhNnPEG9W979jOuJJ1sGr75rhD5hqKzjD8vbMbSsRnq_Ni3ZIGfY6hKWmsOf3qHKJInkm4h55lzvLAXJVc-Rr4kI9O1tmIblblUpg2oqoq8RIQRMQJhFsTr5s9haxQ07EQHxoUO0ICubVFGYfJiMUPor1GnIWb5i8",
		       "width" : 519
		    }
		 ],
		 "place_id" : "ChIJyWEHuEmuEmsRm9hTkapTCrk",
		 "scope" : "GOOGLE",
		 "alt_ids" : [
		    {
		       "place_id" : "D9iJyWEHuEmuEmsRm9hTkapTCrk",
		       "scope" : "APP"
		    }
		 ],
		 "reference" : "CoQBdQAAAFSiijw5-cAV68xdf2O18pKIZ0seJh03u9h9wk_lEdG-cP1dWvp_QGS4SNCBMk_fB06YRsfMrNkINtPez22p5lRIlj5ty_HmcNwcl6GZXbD2RdXsVfLYlQwnZQcnu7ihkjZp_2gk1-fWXql3GQ8-1BEGwgCxG-eaSnIJIBPuIpihEhAY1WYdxPvOWsPnb2-nGb6QGhTipN0lgaLpQTnkcMeAIEvCsSa0Ww",
		 "types" : [ "travel_agency", "restaurant", "food", "establishment" ],
		 "vicinity" : "Pyrmont Bay Wharf Darling Dr, Sydney"
	      },
	      {
		 "geometry" : {
		    "location" : {
		       "lat" : -33.866891,
		       "lng" : 151.200814
		    }
		 },
		 "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
		 "id" : "45a27fd8d56c56dc62afc9b49e1d850440d5c403",
		 "name" : "Private Charter Sydney Habour Cruise",
		 "photos" : [
		    {
		       "height" : 426,
		       "html_attributions" : [],
		       "photo_reference" : "CnRnAAAAL3n0Zu3U6fseyPl8URGKD49aGB2Wka7CKDZfamoGX2ZTLMBYgTUshjr-MXc0_O2BbvlUAZWtQTBHUVZ-5Sxb1-P-VX2Fx0sZF87q-9vUt19VDwQQmAX_mjQe7UWmU5lJGCOXSgxp2fu1b5VR_PF31RIQTKZLfqm8TA1eynnN4M1XShoU8adzJCcOWK0er14h8SqOIDZctvU",
		       "width" : 640
		    }
		 ],
		 "place_id" : "ChIJqwS6fjiuEmsRJAMiOY9MSms",
		 "scope" : "GOOGLE",
		 "reference" : "CpQBhgAAAFN27qR_t5oSDKPUzjQIeQa3lrRpFTm5alW3ZYbMFm8k10ETbISfK9S1nwcJVfrP-bjra7NSPuhaRulxoonSPQklDyB-xGvcJncq6qDXIUQ3hlI-bx4AxYckAOX74LkupHq7bcaREgrSBE-U6GbA1C3U7I-HnweO4IPtztSEcgW09y03v1hgHzL8xSDElmkQtRIQzLbyBfj3e0FhJzABXjM2QBoUE2EnL-DzWrzpgmMEulUBLGrtu2Y",
		 "types" : [ "restaurant", "food", "establishment" ],
		 "vicinity" : "Australia"
	      },
	      {
		 "geometry" : {
		    "location" : {
		       "lat" : -33.870943,
		       "lng" : 151.190311
		    }
		 },
		 "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
		 "id" : "30bee58f819b6c47bd24151802f25ecf11df8943",
		 "name" : "Bucks Party Cruise",
		 "opening_hours" : {
		    "open_now" : true
		 },
		 "photos" : [
		    {
		       "height" : 600,
		       "html_attributions" : [],
		       "photo_reference" : "CnRnAAAA48AX5MsHIMiuipON_Lgh97hPiYDFkxx_vnaZQMOcvcQwYN92o33t5RwjRpOue5R47AjfMltntoz71hto40zqo7vFyxhDuuqhAChKGRQ5mdO5jv5CKWlzi182PICiOb37PiBtiFt7lSLe1SedoyrD-xIQD8xqSOaejWejYHCN4Ye2XBoUT3q2IXJQpMkmffJiBNftv8QSwF4",
		       "width" : 800
		    }
		 ],
		 "place_id" : "ChIJLfySpTOuEmsRsc_JfJtljdc",
		 "scope" : "GOOGLE",
		 "reference" : "CoQBdQAAANQSThnTekt-UokiTiX3oUFT6YDfdQJIG0ljlQnkLfWefcKmjxax0xmUpWjmpWdOsScl9zSyBNImmrTO9AE9DnWTdQ2hY7n-OOU4UgCfX7U0TE1Vf7jyODRISbK-u86TBJij0b2i7oUWq2bGr0cQSj8CV97U5q8SJR3AFDYi3ogqEhCMXjNLR1k8fiXTkG2BxGJmGhTqwE8C4grdjvJ0w5UsAVoOH7v8HQ",
		 "types" : [ "restaurant", "food", "establishment" ],
		 "vicinity" : "37 Bank St, Pyrmont"
	      },
	      {
		 "geometry" : {
		    "location" : {
		       "lat" : -33.867591,
		       "lng" : 151.201196
		    }
		 },
		 "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/travel_agent-71.png",
		 "id" : "a97f9fb468bcd26b68a23072a55af82d4b325e0d",
		 "name" : "Australian Cruise Group",
		 "opening_hours" : {
		    "open_now" : true
		 },
		 "photos" : [
		    {
		       "height" : 242,
		       "html_attributions" : [],
		       "photo_reference" : "CnRnAAAABjeoPQ7NUU3pDitV4Vs0BgP1FLhf_iCgStUZUr4ZuNqQnc5k43jbvjKC2hTGM8SrmdJYyOyxRO3D2yutoJwVC4Vp_dzckkjG35L6LfMm5sjrOr6uyOtr2PNCp1xQylx6vhdcpW8yZjBZCvVsjNajLBIQ-z4ttAMIc8EjEZV7LsoFgRoU6OrqxvKCnkJGb9F16W57iIV4LuM",
		       "width" : 200
		    }
		 ],
		 "place_id" : "ChIJrTLr-GyuEmsRBfy61i59si0",
		 "scope" : "GOOGLE",
		 "reference" : "CoQBeQAAAFvf12y8veSQMdIMmAXQmus1zqkgKQ-O2KEX0Kr47rIRTy6HNsyosVl0CjvEBulIu_cujrSOgICdcxNioFDHtAxXBhqeR-8xXtm52Bp0lVwnO3LzLFY3jeo8WrsyIwNE1kQlGuWA4xklpOknHJuRXSQJVheRlYijOHSgsBQ35mOcEhC5IpbpqCMe82yR136087wZGhSziPEbooYkHLn9e5njOTuBprcfVw",
		 "types" : [ "travel_agency", "restaurant", "food", "establishment" ],
		 "vicinity" : "32 The Promenade, King Street Wharf 5, Sydney"
	      }
	   ],
	   "status" : "OK"
	};

	body.results.filter(function(place) {
	//bodyTemp.results.filter(function(place) {
		if (place.types.indexOf('travel_agency') == -1)
			return true;
	});

	res.json(body);
});

router.get('/api/photo', function(req, res, next) {
	res.json({img_path: ''})
});

router.get('/api/trips', function(req, res, next) {
	data = require('../config/trip_id_2.json');
	var images_path = 'poi_images/';
	var image_index = 0;
	data.values[0].destinations.map(function(day) {
		day.map(function(poi){
			poi.photo_url = images_path + (image_index % 10 + 1).toString() + '.jpeg';
			image_index ++;
		});
	});
	return res.json(data);
});

module.exports = router;
