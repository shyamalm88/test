
'use static'
// Require all modules
var express = require("express"),
	request = require("request"),
	router = express.Router(); 

//Api Key
var mapApiKey = 'AIzaSyC4xjrSTD2KELiRE9a6VqFo5a7ykX8Ydw0',
	searchApiKey = 'AIzaSyAzyPg-0q71sGRkmFLxrTaI5-zZPDr3rSA',
	pageToken;


// creating method for api calling
router.post('/getNearbyData', function(req, resp){
	
	var url = 'https://maps.googleapis.com/maps/api/place/search/json?hasNextPage=true&nextPage()=true&sensor=false&key='+searchApiKey,
		optionUrl = createReqUrl(url, req.body),
		options = {url: optionUrl};
		
	//sample req ==== 
	//https://maps.googleapis.com/maps/api/place/search/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&name=cruise&key=AIzaSyAzyPg-0q71sGRkmFLxrTaI5-zZPDr3rSA
	//if(pageToken)
		//options.url = options.url+'&pagetoken='+pageToken;
	
	request.get(options, function(error, response, body)	{
		if(error)
			resp.send(error);
		else{
			//pageToken = (JSON.parse(body).next_page_token) ? JSON.parse(body).next_page_token : null;
			var destinationList = '',
				data = JSON.parse(body),
				locationData;
			for(var i = 0; i< data.results.length; i++){
				if(destinationList == '')
					destinationList = data.results[i].geometry.location.lat+','+data.results[i].geometry.location.lng;
				else
					destinationList = destinationList+'|'+data.results[i].geometry.location.lat+','+data.results[i].geometry.location.lng;
			}
			var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?key='+searchApiKey+'&origins='+req.body.location+'&destinations='+destinationList;
			
			request.get({url: url}, function(error, response, body)	{
				if(error)
					return error;
				else{
					locationData = JSON.parse(body);
					for(var j = 0; j< data.results.length; j++){
						data.results[j].distance = {};
						data.results[j].distance = locationData.rows[0].elements[j];
					}
					resp.send(data);
				}
			});
			
		}
	});
});	


router.post('/getPlaceAutoComplete', function(req, resp){
	var url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?key='+searchApiKey,
		optionUrl = createReqUrl(url, req.body),
		options = {url: optionUrl};

	//sample req ==== 
	//https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCkvow9LlFNOywy8lzaekn-xROBZRsSFvU&input=sal&components=country:IN
	request.get(options, function(error, response, body)	{
		if(error)
			resp.send(error);
		else
			resp.send(JSON.parse(body));
		
	});
});	

router.post('/getPlaceDetails', function(req, resp){
	var url = 'https://maps.googleapis.com/maps/api/place/details/json?key='+searchApiKey,
		optionUrl = createReqUrl(url, req.body),
		options = {url: optionUrl};

	//sample req ==== 
	//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY
	
	request.get(options, function(error, response, body)	{
		if(error)
			resp.send(error);
		else
			resp.send(JSON.parse(body));
		
	});
});	
var createReqUrl = function(url, qObj){
	for(var i in qObj){
		url = url + '&' + i +'='+ qObj[i];
	}
	return url;
}
// Make route available by exporting
module.exports = router;