'use strict'
hereApp.service('commonService', ['proxyService', function(proxyService) {
    var commonService = this;
    commonService.proxyService = proxyService;
    commonService.userData = {
        'userPosition': null,
        'userSelectedPosition': null,
        'country': null,
        'userLocation': null,
        'userSelectedLocation': null
    };

}]);
