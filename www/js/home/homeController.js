'use strict'
hereApp.controller('homeController', ['$scope', '$state','hereAppConstant', 'homeService', '$ionicPopover', '$ionicSideMenuDelegate',

    function($scope, $state, hereAppConstant, homeService, $ionicPopover, $ionicSideMenuDelegate) {


    	$scope.homeService = homeService;
        // if needed to apply something for all route change
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, $mdToast) {

        })


    }
])
