'use strict'
hereApp.controller('searchResultController', ['$scope', '$state', 'searchResultService', 'commonService', '$ionicLoading', 'homeService',
    function($scope, $state, searchResultService, commonService, $ionicLoading, homeService) {

        $scope.searchResultService = searchResultService;
        $scope.commonService = commonService;
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if (toState.name == 'searchResult') {
                $scope.nextPageToken = null;
                $scope.allMarkerVisible = true;
                $scope.searchType = toParams.type;
                $scope.searchPlace = null;
                $scope.searchCategoryName = toParams.name;
                $scope.searchResultData = [];
                $scope.getNearByData(toParams);
            }
        })
        $scope.filterGroups = homeService.searchFilterGroup.DineOut.filters.concat(homeService.searchFilterGroup.Essentials.filters, homeService.searchFilterGroup.Entertainment.filters);
        console.log($scope.filterGroups);
        // store search result data
        $scope.getNearByData = function(params) {
            $scope.searchedType = params.type;
            var param = $scope.searchResultService.createReqParamForSearch(params, $scope.nextPageToken);
            $scope.commonService.proxyService.callWS($scope.commonService.proxyService.getNearByData, param)
                .then(function(data) {
                    if (data.status == "OK") {
                        $scope.searchResultData = $scope.searchResultData.length ? $scope.searchResultData.concat(data.results) : data.results;
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
        // on change search category or filter search
        $scope.onChangeSearchType = function(searchCategoryName){
            var filterObj = _.find($scope.filterGroups, {'name':searchCategoryName});
            $scope.searchType = filterObj.type;
        }
        $scope.onSubmitNewSearch = function(){
            $scope.nextPageToken = null;
            $scope.searchResultData = [];
            $scope.hasMoreData =  false;
            $scope.searchSelection = {'type':$scope.searchType, 'place': $scope.searchPlace};
            $scope.getNearByData($scope.searchSelection);
        }
        
        $scope.$watch('hasSelectedUserPos', function(newVal, oldval){
            if(newVal){
                $scope.onSubmitNewSearch();
            }
        })
    }
])
