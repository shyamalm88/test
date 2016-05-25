'use strict'
hereApp.service('searchResultService', ['proxyService', 'commonService', function(proxyService, commonService) {

    var self = this;
    self.commonService = commonService;
    self.createReqParamForSearch = function(item) {
        var reqObj = {};
        reqObj.location = self.commonService.userData.userPostion.lat + ',' + self.commonService.userData.userPostion.lng;
        reqObj.radius = '5000';
        reqObj.rankby = 'prominence'; // other option rankby: distance
        reqObj.type = item.toLowerCase();
        return reqObj;
    }

}]);
