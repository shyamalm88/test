'use strict'
hereApp.controller('detailsController', ['$scope', '$state', 'detailsService', 'commonService', 'homeService', 
    function($scope, $state, detailsService, commonService, homeService) {
        $scope.detailsService = detailsService;
        $scope.commonService = commonService;
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if (toState.name == 'details') {
                $scope.getPlaceDetails(toParams.placeID);

            }
        })
        $scope.filterGroups = homeService.searchFilterGroup.DineOut.filters.concat(homeService.searchFilterGroup.Essentials.filters, homeService.searchFilterGroup.Entertainment.filters);
        $scope.getPlaceDetails = function(placeID) {
            var param = { placeid: placeID };

            $scope.commonService.proxyService.callWS($scope.commonService.proxyService.getPlaceDetails, param)
                .then(function(placeData) {
                    if (placeData.status == "OK") {
                        $scope.placeDetailsData = placeData.result;
                        $scope.createPhotoArray($scope.placeDetailsData.photos);
                    }
                }, function(error) {
                    throw error;
                })
        }
        $scope.createPhotoArray = function(photos){
            $scope.placePhotosArray = [];
            _.each(photos, function(photo){
                $scope.getPlacePhoto(photo.photo_reference);
            })
        }
        $scope.getPlacePhoto = function(photoRef) {
            var param = { photoreference: photoRef };
            $scope.commonService.proxyService.callWS($scope.commonService.proxyService.getPlacePhoto, param)
                .then(function(placePhoto) {
                    if (placePhoto.status == "OK") {
                        $scope.placePhotosArray.push(placePhoto.data);
                    }
                }, function(error) {
                    throw error;
                })
        }
        
        $scope.slideOptions = {
            slidesPerView: '2',
        }
    }
])
