'use strict'
hereApp.controller('commonController', ['$scope', '$state', 'hereAppConstant', 'commonService', '$ionicPopover', '$ionicHistory', '$ionicSideMenuDelegate', '$ionicModal',
    function($scope, $state, hereAppConstant, commonService, $ionicPopover, $ionicHistory, $ionicSideMenuDelegate, $ionicModal) {
        $scope.commonService = commonService;
        // if needed to apply something for all route change
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

            })
            //grant location access
        accessUserLoationData();

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

        function accessUserLoationData() {
            // Get the most accurate position updates available on the device.
            var options = { enableHighAccuracy: true, timeout: 30000 };
            navigator.geolocation.watchPosition(onGetLocationSuccess, onGetLocationError, options);
        }

        // onSuccess Geolocation
        //
        function onGetLocationSuccess(position) {
            $scope.commonService.userData.userPostion = { 'lat': position.coords.latitude, 'lng': position.coords.longitude };
            getUserLocationDetails($scope.commonService.userData.userPostion);
        }

        // onError Callback receives a PositionError object
        function onGetLocationError(error) {
            //alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }

        // variable to store location data
        $scope.currentLocation = null;
        // reverse geocoding to get location, country etc
        function getUserLocationDetails(latLng) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latLng }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var countryData = _.find(results[0].address_components, { 'types': ["country"] });
                        if (countryData)
                            $scope.commonService.userData.country = countryData.short_name;
                        $scope.commonService.userData.userLocation = results[0].formatted_address;
                        $scope.currentLocation = ($scope.commonService.userData.userSelectedLocation) ? $scope.commonService.userData.userSelectedLocation: $scope.commonService.userData.userLocation;
                        $scope.$apply();
                    }
                }
            });
        }


        //******************** Below code is for locaiton search and select functionality ************//

        $scope.getPlaceAutoCompleteData = function(searchText) {
            if (searchText != '') {
                var param = createGetPlaceAutoCompleteParam(searchText);
                return $scope.commonService.proxyService.callWS($scope.commonService.proxyService.getPlaceAutoComplete, param)
                    .then(function(data) {
                        if (data.status == "OK") {
                            return data.predictions;
                        }
                    }, function(error) {
                        throw error;
                    })
            }
        }

        var createGetPlaceAutoCompleteParam = function(searchText) {
            return {
                'input': searchText,
                'components': 'country:' + $scope.commonService.userData.country
            }
        }

        $scope.selectedItemChange = function(item) {
            if (typeof item === 'object') {
                $scope.commonService.userData.userSelectedLocation = item.description;
                $scope.currentLocation = $scope.commonService.userData.userSelectedLocation;
                var param = { 'placeid': item.place_id };
                $scope.commonService.proxyService.callWS($scope.commonService.proxyService.getPlaceDetails, param)
                    .then(function(data) {
                        if (data.status == "OK") {
                            $scope.commonService.userData.userSelectedPosition = data.result.geometry.location;
                            var countryData = _.find(data.result.address_components, { 'types': ["country"] });
                            if (countryData)
                                $scope.commonService.userData.country = countryData.short_name;
                        }
                    }, function(error) {
                        throw error;
                    })
            }

        }
        
        
    }
])
