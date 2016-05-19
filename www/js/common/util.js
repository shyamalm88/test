'use strict'
hereApp.factory('hereAppUtil',['hereAppConstant', function(hereAppConstant){
	var createWSUrl = function(urlPath, method){
		return {
			'url':hereAppConstant.WSPATH.PATH + urlPath,
			'method': method
		}
	}

	return{
		createWSUrl: createWSUrl
	}
}])