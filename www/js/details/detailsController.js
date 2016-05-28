'use strict'
hereApp.controller('detailsController', ['$scope', '$state', 'detailsService', 'commonService',
    function($scope, $state, detailsService, commonService) {

        $scope.detailsService = detailsService;
        $scope.commonService = commonService;
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if (toState.name == 'details') {
                $scope.getPlaceDetails(toParams.placeID);
            }
        })

        $scope.getPlaceDetails = function(placeID) {
            var param = { placeid: placeID };
            $scope.commonService.proxyService.callWS($scope.commonService.proxyService.getPlaceDetails, param)
                .then(function(placeData) {
                    if (placeData.status == "OK") {
                        $scope.placeDetailsData = placeData.result;
                        //$scope.showPlacePhoto($scope.placeDetailsData.photos[5].photo_reference);
                    }
                }, function(error) {
                    throw error;
                })
        }

        $scope.showPlacePhoto = function(photoRef) {
            var param = { photoreference: photoRef };
            $scope.commonService.proxyService.callWS($scope.commonService.proxyService.getPlacePhoto, param)
                .then(function(placePhoto) {
                    if (placePhoto.status == "OK") {
                        $scope.placePhoto = placePhoto;
                    }
                }, function(error) {
                    throw error;
                })
        }
    }
])
