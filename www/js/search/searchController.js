'use strict'
hereApp.controller('searchController',['$scope','$state','hereAppConstant','searchService', 'commonService',
  function($scope, $state,hereAppConstant,searchService, commonService){

  	$scope.commonService = commonService;
    // if needed to apply something for all route change
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

    })

    
}])