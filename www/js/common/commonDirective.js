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
                directionsDisplay = new google.maps.DirectionsRenderer,
                directionsService = new google.maps.DirectionsService;
            // some delay to get the dom ready
            $timeout(function(){
                map = new google.maps.Map(document.getElementById('mapLocation'), {
                    zoom: 12,
                    center: commonService.userData.userSelectedPosition,
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
                    scope.changeDirectionMode('DRIVING');
                }
            }
            scope.changeDirectionMode = function(selectedMode){
                directionsService.route({
                  origin: commonService.userData.userPosition,
                  destination: scope.directionDestination, 
                  travelMode: google.maps.TravelMode[selectedMode]
                }, function(response, status) {
                  if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                  } else {
                    window.alert('Directions request failed due to ' + status);
                  }
                });
            }
            
        }]
    }
})
