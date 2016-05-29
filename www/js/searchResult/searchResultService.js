
'use strict'
hereApp.service('searchResultService', ['proxyService', 'commonService', function(proxyService, commonService) {

    var self = this;
    self.commonService = commonService;
    self.createReqParamForSearch = function(type, pageToken) {
        var reqObj = {};
        reqObj.location = (self.commonService.userData.userSelectedPosition) ? self.commonService.userData.userSelectedPosition.lat + ',' + self.commonService.userData.userSelectedPosition.lng :  self.commonService.userData.userPosition.lat + ',' + self.commonService.userData.userPosition.lng;
        reqObj.radius = '5000';
        reqObj.type = type;
        if(pageToken)
            reqObj.pagetoken = pageToken;
        return reqObj;
    }
}]);