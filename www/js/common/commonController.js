'use strict'
hereApp.controller('commonController', ['$scope', '$state', 'hereAppConstant', 'getUserLocationService', '$ionicPopover', '$ionicHistory', '$ionicSideMenuDelegate', '$ionicModal',
    function($scope, $state, hereAppConstant, getUserLocationService, $ionicPopover, $ionicHistory, $ionicSideMenuDelegate, $ionicModal) {
        //$scope.commonService = commonService;
        $scope.getUserLocationService = getUserLocationService
            // if needed to apply something for all route change
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

            })
            //grant location access
        $scope.getUserLocationService.accessUserLoationData();


        //go back with cache
        $scope.prev = function() {
            $ionicHistory.goBack();
        };


        $scope.toggleGroup = function(group) {
            //$event.preventDefault();
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };

        //login modal
        $ionicModal.fromTemplateUrl('partials/login/login.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.loginModal = modal;
        });
        $scope.openModal = function() {
            $scope.loginModal.show();
        };
        $scope.closeModal = function() {
            $scope.loginModal.hide();
        };

        // go to search page
        $scope.goToSearch = function() {
            $state.go('search');
        }

        // popovers option
        $ionicPopover.fromTemplateUrl('partials/common/popover-menu.html', {
            scope: $scope,
            backdropClickToClose: true,

        }).then(function(popover) {
            $scope.popover = popover;
        });
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        $scope.togglefilter = function() {
            $ionicSideMenuDelegate.toggleRight();
        };

        // function accessUserLoationData() {
        //     // Get the most accurate position updates available on the device.
        //     var options = { enableHighAccuracy: true, timeout: 30000 };
        //     navigator.geolocation.watchPosition(onGetLocationSuccess, onGetLocationError, options);
        // }

        // // onSuccess Geolocation
        // //
        // function onGetLocationSuccess(position) {
        //     $scope.commonService.userData.userPostion = { 'lat': position.coords.latitude, 'lng': position.coords.longitude };
        //     getUserLocationDetails($scope.commonService.userData.userPostion);
        // }

        // // onError Callback receives a PositionError object
        // function onGetLocationError(error) {
        //     //alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        // }




        // reverse geocoding to get location, country etc



        //******************** Below code is for locaiton search and select functionality ************//

        $scope.getPlaceAutoCompleteData = function(searchText) {
            if (searchText != '') {
                var param = createGetPlaceAutoCompleteParam(searchText);
                return $scope.getUserLocationService.proxyService.callWS($scope.getUserLocationService.proxyService.getPlaceAutoComplete, param)
                    .then(function(data) {
                        if (data.status == "OK") {
                            return data.predictions;
                        }
                    }, function(eror) {
                        throw error;
                    })
            }
        }

        var createGetPlaceAutoCompleteParam = function(searchText) {
            return {
                'input': searchText,
                'components': 'country:' + $scope.getUserLocationService.userData.country
            }
        }

        $scope.selectedItemChange = function(item) {
            if (typeof item === 'object') {
                $scope.getUserLocationService.userData.location = item.description;
                var param = { 'placeid': item.place_id };
                $scope.getUserLocationService.proxyService.callWS($scope.getUserLocationService.proxyService.getPlaceDetails, param)
                    .then(function(data) {
                        if (data.status == "OK") {
                            $scope.getUserLocationService.userData.userPostion = data.result.geometry.location;
                            var countryData = _.find(data.result.address_components, { 'types': ["country"] });
                            if (countryData)
                                $scope.getUserLocationService.userData.country = countryData.short_name;
                        }
                    }, function(eror) {
                        throw error;
                    })
            }

        }
    }
])
