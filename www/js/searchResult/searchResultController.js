'use strict'
hereApp.controller('searchResultController', ['$scope', '$state', 'searchResultService',
    function($scope, $state, searchResultService) {

        $scope.searchResultService = searchResultService;
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $scope.getNearByData(toParams.type);
        })

        $scope.getNearByData = function(item) {
            var param = $scope.searchResultService.createReqParamForSearch(item);
            $scope.getUserLocationService.proxyService.callWS($scope.getUserLocationService.proxyService.getNearByData, param)
                .then(function(data) {
                    if (data.status == "OK") {
                        $scope.searchResultData = data.results;
                        //console.log(data.results);

                    }
                }, function(eror) {
                    throw error;
                })
        }
    }
])
