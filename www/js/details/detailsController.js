'use strict'
hereApp.controller('detailsController',['$scope','$state','detailsService',
  function($scope, $state,detailsService){

    // if needed to apply something for all route change
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

    })
}])