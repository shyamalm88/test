'use strict'
hereApp.controller('detailsController',['$scope','$state','detailsService',
  function($scope, $state,detailsService){

  	$scope.detailsService = detailsService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    	
    })
}])