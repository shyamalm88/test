'use strict'
hereApp.service('searchResultService',['proxyService','commonService',function(proxyService, commonService){
	
	var self =this;
	self.commonService = commonService;
	self.createReqParamForSearch = function(type){
		var reqObj = {};
		reqObj.location = self.commonService.userData.userPostion.lat+','+self.commonService.userData.userPostion.lng;
		reqObj.radius = '1000';
		reqObj.type = type;
		return reqObj;
	}

}]);