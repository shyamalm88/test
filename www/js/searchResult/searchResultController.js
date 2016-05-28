
'use strict'
hereApp.controller('searchResultController', ['$scope', '$state', 'searchResultService', 'commonService', '$ionicLoading',
    function($scope, $state, searchResultService, commonService, $ionicLoading) {

        $scope.searchResultService = searchResultService;
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                if (toState.name == 'searchResult') {
                    $scope.nextPageToken = null;
                    $scope.getNearByData(toParams.type);
                }
            })
            // store search result data
        $scope.getNearByData = function(item) {
            $scope.searchedType = item;
            var param = $scope.searchResultService.createReqParamForSearch(item, $scope.nextPageToken);
            $scope.commonService.proxyService.callWS($scope.commonService.proxyService.getNearByData, param)
                .then(function(data) {
                    if (data.status == "OK") {
                        $scope.searchResultData = $scope.searchResultData ? $scope.searchResultData.concat(data.results) : data.results;
                        $scope.hasMoreData = (data.next_page_token) ? true : false;
                        $scope.nextPageToken = data.next_page_token;
                    }

                }, function(error) {
                    throw error;
                })
        }

        $scope.goToDetails = function(placeId) {
            $state.go('details', { placeID: placeId });
        }
    }
])
