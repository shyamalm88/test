'use strict'
hereApp.controller('homeController', ['$scope', '$state','hereAppConstant', 'homeService', '$ionicPopover', '$ionicSideMenuDelegate',

    function($scope, $state, hereAppConstant, homeService, $ionicPopover, $ionicSideMenuDelegate) {


    	$scope.homeService = homeService;
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, $mdToast) {

        })

        $scope.getDetails = function(item){
        	$state.go('searchResult', {type:item});
        }

    }
])
