'use strict'
hereApp.service('searchResultService', ['proxyService', 'getUserLocationService', function(proxyService, getUserLocationService) {
    var self = this;
    self.getUserLocationService = getUserLocationService;
    self.createReqParamForSearch = function(item) {
        var reqObj = {};
        reqObj.location = self.getUserLocationService.userData.userPostion.lat + ',' + self.getUserLocationService.userData.userPostion.lng;
        reqObj.radius = '5000';
        reqObj.type = item.toLowerCase();
        return reqObj;
    }

}]);
