'use strict'
hereApp.controller('searchResultController', ['$scope', '$state', 'searchResultService', 'commonService',
    function($scope, $state, searchResultService, commonService) {

        $scope.searchResultService = searchResultService;
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $scope.getNearByData(toParams.type);
        })
        // store search result data
        $scope.getNearByData = function(item) {
            $scope.searchedType = item;
            var param = $scope.searchResultService.createReqParamForSearch(item);
            $scope.commonService.proxyService.callWS($scope.commonService.proxyService.getNearByData, param)
                .then(function(data) {
                    if (data.status == "OK") {
                        $scope.searchResultData = $scope.searchResultData ? $scope.searchResultData.concat(data.results) : data.results;
                        $scope.hasMoreData = (data.next_page_token) ? true : false;
                    }
                }, function(error) {
                    throw error;
                })
        }
    }
])
