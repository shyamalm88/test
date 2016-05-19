'use strict'
hereApp.controller('registerController',['$scope','$state','registerService',
  function($scope, $state,registerService){

    // if needed to apply something for all route change
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

    })
}])