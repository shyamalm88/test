'use strict'
hereApp.service('proxyService', ['$http', 'hereAppConstant', 'hereAppUtil', '$q', 
  function($http, hereAppConstant, hereAppUtil, $q){
  this.callWS = function(urlObj, data ){

    var reqObj = {
      url: urlObj.url,
      data : data,
      method: (urlObj.method) ? urlObj.method : 'POST'
    }
    
    return $http(reqObj)
      .then(function(response) {
        if (typeof response.data === 'object') {
            return response.data;
        } else {
            // invalid response
            return $q.reject(response.data);
        }
      }, function(error) {
          return $q.reject(response.data);
      });
  }


  // create whole url path
  this.getPlaceAutoComplete = hereAppUtil.createWSUrl(hereAppConstant.WSURL.GET_PLACE_AUTOCOMPLETE);
  this.getPlaceDetails = hereAppUtil.createWSUrl(hereAppConstant.WSURL.GET_PLACE_DETAILS);
}])