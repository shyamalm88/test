'use strict'
hereApp.directive('hereAppMap', function(commonService){
    return{
        restrict: 'E',
        templateUrl:'partials/common/map.html',
        scope:{
            data: '=mapData',
            showPins : '='
        }, 
        link: function(scope, ele, attr){
            var map = new google.maps.Map(document.getElementById('mapLocation'), {
                zoom: 10,
                center: commonService.userData.userPostion,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            scope.$watch('data', function(newVal, oldVal){
                if(newVal){
                    scope.showDataOnMap();
                }
            }, true)
            scope.showDataOnMap = function(){
                if(scope.showPins){
                    var locations = [], marker, i;
                    angular.forEach(scope.data, function(value, key) {
                        locations.push([value.vicinity, value.geometry.location.lat, value.geometry.location.lng, key.length - 1]);
                    });
                    var infowindow = new google.maps.InfoWindow();
            
                    _.each(locations, function(location){
                         marker = new google.maps.Marker({
                            position: new google.maps.LatLng(location[1], location[2]),
                            map: map,
                            animation: google.maps.Animation.DROP
                        });
            
                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
                                infowindow.setContent(location[0]);
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
        }
    }
})
