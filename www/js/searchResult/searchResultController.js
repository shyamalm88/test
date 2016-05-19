'use strict'
hereApp.controller('searchResultController',['$scope','$state','searchResultService',
  function($scope, $state,searchResultService){

    // if needed to apply something for all route change
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

    })
}])