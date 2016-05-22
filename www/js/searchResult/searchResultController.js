'use strict'
hereApp.controller('searchResultController',['$scope','$state','searchResultService',
  function($scope, $state,searchResultService){

    $scope.searchResultService = searchResultService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		$scope.getNearByData(toParams.type);
    })

    $scope.getNearByData = function(type){
    	var param = $scope.searchResultService.createReqParamForSearch(type);
    	$scope.commonService.proxyService.callWS($scope.commonService.proxyService.getNearByData, param)
        .then(function(data){
            if(data.status == "OK"){
               	$scope.searchResultData = data.results;
            }
        },function(eror){
            throw error;
        })
    }
}])