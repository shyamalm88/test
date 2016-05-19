'use strict'
hereApp.controller('loginController',['$scope','$state','loginService',
  function($scope, $state,loginService){

    // if needed to apply something for all route change
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

    })
}])