'use strict'
hereApp.directive('hereAppMap', function(commonService, $timeout, $ionicScrollDelegate) {
    return {
        restrict: 'E',
        templateUrl: 'partials/common/map.html',
        scope: {
            data: '=mapData',
            showPins: '=',
            showDirection: '=',
            directionDestination: '='
        },
        controller: ['$scope', '$state', function(scope, $state) {
            scope.onDetailsPage = false;
            scope.$state = $state;
            if ($state.current.name == 'details') {
                scope.onDetailsPage = true;
            }

            var map,
                markerArray = [],
                directionsDisplay = new google.maps.DirectionsRenderer,
                directionsService = new google.maps.DirectionsService,
                infowindow = new google.maps.InfoWindow();
            // some delay to get the dom ready
            var mapInit = function(location) {
                if (!location)
                    var location = (commonService.userData.userSelectedPosition) ? commonService.userData.userSelectedPosition : commonService.userData.userPosition;
                map = new google.maps.Map(document.getElementById('mapLocation'), {
                    zoom: 12,
                    center: location,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

            }

            $timeout(function() {
                mapInit();
                scope.$watch('data', function(newVal, oldVal) {
                    if (newVal) {
                        scope.showDataOnMap();
                    }
                }, true)
                scope.$watch('directionDestination', function(newVal, oldVal) {
                    if (newVal) {
                        scope.showDirectionOnMap();
                    }
                }, true)

            }, 1000)

            scope.IsVisibleDirection = false;
            scope.showDirectionMap = function() {
                scope.IsVisibleDirection = scope.IsVisibleDirection ? false : true;

            }

            // view on map functionality for search result page
            scope.$parent.viewOnMap = function(result) {
                $ionicScrollDelegate.scrollTop();
                scope.$parent.allMarkerVisible = false;
                mapInit(result.geometry.location);
                var marker = new google.maps.Marker({
                    position: result.geometry.location,
                    map: map
                });
            }

            scope.$parent.viewAllPinsOnMap = function() {
                mapInit();
                scope.showDataOnMap();
            }

            scope.showDataOnMap = function() {
                if (scope.showPins) {
                    scope.$parent.allMarkerVisible = true;

                    var locations = [],
                        marker, i, placeName = [];
                    angular.forEach(scope.data, function(value, key) {
                        placeName.push(value.name);
                        locations.push([value.vicinity, value.geometry.location.lat, value.geometry.location.lng, key.length - 1]);
                    });

                    _.each(locations, function(location, i) {
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(location[1], location[2]),
                            map: map,
                            animation: google.maps.Animation.DROP
                        });
                        var contentString = '<div id="content">' +
                            '<div id="siteNotice">' +
                            '</div>' +
                            '<h4 id="firstHeading" class="firstHeading">' + placeName[i] + '</h4>' +
                            '<div id="bodyContent">' +
                            '<p>' + location[0] + '</p>' +
                            '</div>' +
                            '</div>';
                        addClickHandlerToPushPins(marker, contentString);
                    })
                }
            }

            var addClickHandlerToPushPins = function(marker, contentString) {
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.close();
                    infowindow.setContent(contentString);
                    infowindow.open(map, marker);
                });
            }

            // for direction in detail page
            scope.showDirectionOnMap = function() {
                if (scope.showDirection) {
                    directionsDisplay.setMap(map);
                    directionsDisplay.setPanel(document.getElementById('direction-details'));
                    scope.changeDirectionMode('DRIVING');
                }
            }
            scope.changeDirectionMode = function(selectedMode) {
                for (var i = 0; i < markerArray.length; i++) {
                    markerArray[i].setMap(null);
                }
                directionsService.route({
                    origin: commonService.userData.userPosition,
                    destination: scope.directionDestination,
                    travelMode: google.maps.TravelMode[selectedMode]
                }, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        showSteps(response, markerArray, infowindow, map);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });

                function showSteps(directionResult, markerArray, infowindow, map) {
                    // For each step, place a marker, and add the text to the marker's infowindow.
                    // Also attach the marker to an array so we can keep track of it and remove it
                    // when calculating new routes.
                    var myRoute = directionResult.routes[0].legs[0];
                    for (var i = 0; i < myRoute.steps.length; i++) {
                        var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
                        marker.setMap(map);
                        marker.setPosition(myRoute.steps[i].start_location);
                        addClickHandlerToPushPins(marker, myRoute.steps[i].instructions);
                    }
                }
            }
        }]
    }
})
