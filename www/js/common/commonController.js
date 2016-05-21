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

        //menu accordion

        $scope.groups = {
            'menu': [{
                'title': 'Home',
                'icon': 'home',
                'submenu': null,
            }, {
                'title': 'Meeting Place',
                'icon': 'meeting-point',
                'submenu': null,
            }, {
                'title': 'Dineout',
                'icon': 'dining-meal',
                'submenu': [{
                    'menu_title': 'Delivery',
                    'menu_icon': 'delivery'

                }, {
                    'menu_title': 'Breakfast',
                    'menu_icon': 'breakfast'

                }, {
                    'menu_title': 'Lunch',
                    'menu_icon': 'lunch'

                }, {
                    'menu_title': 'Dinner',
                    'menu_icon': 'dinner'

                }, {
                    'menu_title': 'Drinks & Nightlife',
                    'menu_icon': 'cocktail'

                }, {
                    'menu_title': 'Cafes',
                    'menu_icon': 'coffee'

                }, {
                    'menu_title': 'Cuisine',
                    'menu_icon': 'indian'

                }, {
                    'menu_title': 'Buffet Places',
                    'menu_icon': 'lunch'

                }]
            }, {
                'title': 'Essentials',
                'icon': 'location-pin',
                'submenu': [{
                    'menu_title': 'ATM',
                    'menu_icon': 'atm'

                }, {
                    'menu_title': 'Blood Bank',
                    'menu_icon': 'blood-bank'

                }, {
                    'menu_title': 'Hospitals',
                    'menu_icon': 'hospital'

                }, {
                    'menu_title': 'Bank',
                    'menu_icon': 'bank'

                }, {
                    'menu_title': 'Parking',
                    'menu_icon': 'parking'

                }, {
                    'menu_title': 'Pharmacy',
                    'menu_icon': 'medicine'

                }, {
                    'menu_title': 'Police',
                    'menu_icon': 'police'

                }, {
                    'menu_title': 'Library',
                    'menu_icon': 'book'

                }, {
                    'menu_title': 'Car Repair',
                    'menu_icon': 'car-repair'

                }]
            }, {
                'title': 'Entertainment',
                'icon': 'tickets',
                'submenu': [{
                    'menu_title': 'Movie Theater',
                    'menu_icon': 'theater'

                }, {
                    'menu_title': 'Stadium',
                    'menu_icon': 'stadium'

                }, {
                    'menu_title': 'Race Course',
                    'menu_icon': 'race-course'

                }]
            }, {
                'title': 'Transport',
                'icon': 'bus',
                'submenu': [{
                    'menu_title': 'Taxi Stand',
                    'menu_icon': 'taxi'

                }, {
                    'menu_title': 'Bus Stop',
                    'menu_icon': 'bus-stop'

                }, {
                    'menu_title': 'Bus Stand',
                    'menu_icon': 'bus'

                }, {
                    'menu_title': 'Train Station',
                    'menu_icon': 'train'

                }, {
                    'menu_title': 'Metro Station',
                    'menu_icon': 'metro'

                }, {
                    'menu_title': 'Airport',
                    'menu_icon': 'airport'

                }]
            }, {
                'title': 'Shopping',
                'icon': 'shop',
                'submenu': [{
                    'menu_title': 'Shopping Mall',
                    'menu_icon': 'mall'

                }, {
                    'menu_title': 'Book Store',
                    'menu_icon': 'book'

                }, {
                    'menu_title': 'Car Dealer',
                    'menu_icon': 'car'

                }, {
                    'menu_title': 'Clothing Store',
                    'menu_icon': 'store-1'

                }, {
                    'menu_title': 'Convenience Store',
                    'menu_icon': 'store'

                }, {
                    'menu_title': 'Departmental Store',
                    'menu_icon': 'store-1'

                }, {
                    'menu_title': 'Furniture Store',
                    'menu_icon': 'furniture'

                }, {
                    'menu_title': 'Super Market',
                    'menu_icon': 'store-1'

                }, {
                    'menu_title': 'Hardware Store',
                    'menu_icon': 'hardware'

                }, {
                    'menu_title': 'Jewelry Store',
                    'menu_icon': 'jewelry'

                }, {
                    'menu_title': 'Liquor Store',
                    'menu_icon': 'liquor'

                }, {
                    'menu_title': 'Pet Store',
                    'menu_icon': 'pet'

                }, {
                    'menu_title': 'Shoe Store',
                    'menu_icon': 'shoe'

                }, {
                    'menu_title': 'Store',
                    'menu_icon': 'store'

                }]
            }, {
                'title': 'Fun',
                'icon': 'fun',
                'submenu': [{
                    'menu_title': 'Amusment Park',
                    'menu_icon': 'amusement-park'

                }, {
                    'menu_title': 'Art Gallery',
                    'menu_icon': 'art'

                }, {
                    'menu_title': 'Bowling Alley',
                    'menu_icon': 'bowling'

                }, {
                    'menu_title': 'Casino',
                    'menu_icon': 'casino'

                }, {
                    'menu_title': 'City Hall',
                    'menu_icon': 'city-hall'

                }, {
                    'menu_title': 'Museum',
                    'menu_icon': 'museum'

                }, {
                    'menu_title': 'Night Club',
                    'menu_icon': 'disco'

                }, {
                    'menu_title': 'Park',
                    'menu_icon': 'park'

                }, {
                    'menu_title': 'Zoo',
                    'menu_icon': 'zoo'

                }]
            }, {
                'title': 'Miscleneous',
                'icon': 'misc',
                'submenu': [{
                    'menu_title': 'Spa',
                    'menu_icon': 'spa'

                }, {
                    'menu_title': 'Temple / Mosque / Church',
                    'menu_icon': 'temple'

                }, {
                    'menu_title': 'Gym',
                    'menu_icon': 'gym'

                }, {
                    'menu_title': 'University',
                    'menu_icon': 'university'

                }, {
                    'menu_title': 'School',
                    'menu_icon': 'school-book'

                }, {
                    'menu_title': 'College',
                    'menu_icon': 'university'

                }, {
                    'menu_title': 'Travel Agency',
                    'menu_icon': 'travel'

                }]
            }, {
                'title': 'My Bookmarks',
                'icon': 'bookmark',
                'submenu': null,
            }]
        };
        //console.log($scope.groups.menu[3].submenu[1].menu_title);

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
            scope: $scope
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


        // reverse geocoding to get location, country etc
        function getUserLocationDetails(latLng) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latLng }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var countryData = _.find(results[0].address_components, { 'types': ["country"] });
                        if (countryData)
                            $scope.commonService.userData.country = countryData.short_name;
                        $scope.commonService.userData.location = results[0].formatted_address;
                    }
                }
            });
        }
    }
])
