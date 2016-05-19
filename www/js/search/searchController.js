'use strict'
hereApp.controller('searchController',['$scope','$state','hereAppConstant','searchService', 'commonService',
  function($scope, $state,hereAppConstant,searchService, commonService){

  	$scope.commonService = commonService;
    // if needed to apply something for all route change
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

    })

    // get location data 
    $scope.placeAutoCompleteList = [];
    $scope.getPlaceAutoCompleteData = function(searchText){
    	if(searchText != ''){    		
	    	var param = createGetPlaceAutoCompleteParam(searchText);
			$scope.commonService.proxyService.callWS($scope.getLocationDataHandler,$scope.commonService.proxyService.getPlaceAutoComplete, param);
    	}
    }

    var createGetPlaceAutoCompleteParam = function(searchText){
    	return{
    		'input':searchText,
    		'components':'country:'+$scope.commonService.userData.country
    	}
    }

    $scope.getLocationDataHandler = function(data){
    	if(data.status == "OK"){
    		$scope.placeAutoCompleteList = data.predictions;
    	}
    }
}])