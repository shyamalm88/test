'use strict'
hereApp.controller('searchResultController', ['$scope', '$state', 'searchResultService', 'commonService',
    function($scope, $state, searchResultService, commonService) {

        $scope.searchResultService = searchResultService;
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $scope.getNearByData(toParams.type);
        })

        $scope.getNearByData = function(item) {
            var param = $scope.searchResultService.createReqParamForSearch(item);
            $scope.commonService.proxyService.callWS($scope.commonService.proxyService.getNearByData, param)
                .then(function(data) {
                    if (data.status == "OK") {
                        $scope.searchResultData = data.results;
                        //console.log(data.results);
                        $scope.mapMaker();

                    }
                }, function(error) {
                    throw error;
                })
        }

        $scope.mapMaker = function() {
            var locations = [];
            angular.forEach($scope.searchResultData, function(value, key) {
                locations.push([value.vicinity, value.geometry.location.lat, value.geometry.location.lng, key.length - 1]);
            });
            //console.log(commonService.userData.userPostion.lat)
            var map = new google.maps.Map(document.getElementById('mapLocation'), {
                zoom: 12,
                center: new google.maps.LatLng(commonService.userData.userPostion.lat, commonService.userData.userPostion.lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow();

            var marker, i;
            //console.log(locations.length)
            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map,
                    animation: google.maps.Animation.DROP
                });

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map, marker);
                        if (marker.getAnimation() !== null) {
                            marker.setAnimation(null);
                        } else {
                            marker.setAnimation(google.maps.Animation.BOUNCE);
                        }
                    }
                })(marker, i));
            }
            //console.log(locations);

        }
    }
])
