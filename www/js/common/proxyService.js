'use strict'
hereApp.service('proxyService', ['$http', 'hereAppConstant', 'hereAppUtil', '$q', '$ionicLoading',
  function($http, hereAppConstant, hereAppUtil, $q, $ionicLoading) {
    this.callWS = function(urlObj, data) {


      var reqObj = {
        url: urlObj.url,
        data: data,
        method: (urlObj.method) ? urlObj.method : 'POST'
      }

      return $http(reqObj)
        .then(function(response) {
          if (typeof response.data === 'object') {

            return response.data;

          }
          else {
            // invalid response
            return $q.reject(response.data);
          }


        }, function(error) {
          //$ionicLoading.hide()
          return $q.reject(error);
        });

    }


    // create whole url path
    this.getPlaceAutoComplete = hereAppUtil.createWSUrl(hereAppConstant.WSURL.GET_PLACE_AUTOCOMPLETE);
    this.getPlaceDetails = hereAppUtil.createWSUrl(hereAppConstant.WSURL.GET_PLACE_DETAILS);
    this.getNearByData = hereAppUtil.createWSUrl(hereAppConstant.WSURL.GET_NEAR_BY);
  }
])