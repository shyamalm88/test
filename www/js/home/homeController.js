'use strict'
hereApp.controller('homeController', ['$scope', '$state','hereAppConstant', 'homeService', '$ionicPopover', '$ionicSideMenuDelegate', '$ionicLoading', 

    function($scope, $state, hereAppConstant, homeService, $ionicPopover, $ionicSideMenuDelegate, $ionicLoading) {

        
    	$scope.homeService = homeService;
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, $mdToast) {
            
        })

        $scope.getSearchResult = function(type, name){
        	$state.go('searchResult', {type:type, name: name});
        }
        

    }
])
