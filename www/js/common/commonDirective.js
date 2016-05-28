'use strict'
hereApp.directive('hereAppMap', function(commonService, $timeout ) {
    return {
        restrict: 'E',
        templateUrl: 'partials/common/map.html',
        scope: {
            data: '=mapData',
            showPins: '=',
            showDirection: '=',
            directionDestination: '='
        },
        controller: ['$scope', function(scope) {
            var map,
                markerArray = [],
                directionsDisplay = new google.maps.DirectionsRenderer,
                directionsService = new google.maps.DirectionsService,
                stepDisplay = new google.maps.InfoWindow;;
            // some delay to get the dom ready
            $timeout(function(){
                map = new google.maps.Map(document.getElementById('mapLocation'), {
                    zoom: 12,
                    center: (commonService.userData.userSelectedPosition)?commonService.userData.userSelectedPosition: commonService.userData.userPosition,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

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
            },1000)
            
            
            scope.showDataOnMap = function() {
                if (scope.showPins) {
                    var locations = [],
                        marker, i, placeName = [];
                    angular.forEach(scope.data, function(value, key) {
                        placeName.push(value.name);
                        locations.push([value.vicinity, value.geometry.location.lat, value.geometry.location.lng, key.length - 1]);
                    });
                    var infowindow = new google.maps.InfoWindow();

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

                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
                                infowindow.setContent(contentString);
                                //infowindow.setContent(location[0]);
                                infowindow.open(map, marker);
                                /*if (marker.getAnimation() !== null) {
                                    marker.setAnimation(null);
                                } else {
                                    marker.setAnimation(google.maps.Animation.BOUNCE);
                                }*/
                            }
                        })(marker, i));
                    })
                }
            }
            scope.showDirectionOnMap = function(){
                if(scope.showDirection){                    
                    directionsDisplay.setMap(map);
                    directionsDisplay.setPanel(document.getElementById('direction-details'));
                    scope.changeDirectionMode('DRIVING');
                }
            }
            scope.changeDirectionMode = function(selectedMode){
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
                    showSteps(response, markerArray, stepDisplay, map);
                  } else {
                    window.alert('Directions request failed due to ' + status);
                  }
                });

                function showSteps(directionResult, markerArray, stepDisplay, map) {
                  // For each step, place a marker, and add the text to the marker's infowindow.
                  // Also attach the marker to an array so we can keep track of it and remove it
                  // when calculating new routes.
                    var myRoute = directionResult.routes[0].legs[0];
                    for (var i = 0; i < myRoute.steps.length; i++) {
                        var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
                        marker.setMap(map);
                        marker.setPosition(myRoute.steps[i].start_location);
                        attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
                    }
                }

                function attachInstructionText(stepDisplay, marker, text, map) {
                    google.maps.event.addListener(marker, 'click', function() {
                        // Open an info window when the marker is clicked on, containing the text
                        // of the step.
                        stepDisplay.setContent(text);
                        stepDisplay.open(map, marker);
                    });
                }  
            }
        }]
    }
})
