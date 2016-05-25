'use strict'
hereApp.service('commonService', ['proxyService', function(proxyService) {
    var commonService = this;
    commonService.proxyService = proxyService;
    commonService.userData = {
        'userPostion': null,
        'country': null,
        'location': null
    };

}]);
