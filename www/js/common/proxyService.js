'use strict'
hereApp.service('proxyService', ['$http', 'hereAppConstant', 'hereAppUtil', 
  function($http, hereAppConstant, hereAppUtil){
  this.callWS = function(resFN, urlObj, data ){

    var reqObj = {
      url: urlObj.url,
      data : data,
      method: (urlObj.method) ? urlObj.method : 'POST'
    }
    
    $http(reqObj)
      .then(function successCallback(response) {
        resFN(response.data);
      }, function errorCallback(error) {
        console.log(error)
      });
  }


  // create whole url path
  this.getPlaceAutoComplete = hereAppUtil.createWSUrl(hereAppConstant.WSURL.GET_PLACE_AUTOCOMPLETE);
}])