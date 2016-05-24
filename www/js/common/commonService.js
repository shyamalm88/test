'use strict'
// hereApp.service('commonService', ['proxyService', function(proxyService) {
//     var commonService = this;
//     commonService.proxyService = proxyService;
//     commonService.userData = {
//         'userPostion': null,
//         'country': null,
//         'location': null
//     };

// }]);


hereApp.service('getUserLocationService', ['proxyService', function(proxyService) {
    var getUserLocationService = this;

    getUserLocationService.proxyService = proxyService;
    getUserLocationService.userData = {
        'userPostion': null,
        'country': null,
        'location': null
    };

    getUserLocationService.accessUserLoationData = function() {
        var options = { enableHighAccuracy: true, timeout: 30000 };
        navigator.geolocation.watchPosition(onGetLocationSuccess, onGetLocationError, options);
    }

    function onGetLocationSuccess(position) {
        getUserLocationService.userData.userPostion = { 'lat': position.coords.latitude, 'lng': position.coords.longitude };
        getUserLocationDetails(getUserLocationService.userData.userPostion);
        console.log(getUserLocationService.userData.userPostion);
    }

    // onError Callback receives a PositionError object
    function onGetLocationError(error) {
        //alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }

    function getUserLocationDetails(latLng) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latLng }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var countryData = _.find(results[0].address_components, { 'types': ["country"] });
                    if (countryData)
                        getUserLocationService.userData.country = countryData.short_name;
                    //getUserLocationService.userData.location = results[0].formatted_address;
                    getUserLocationService.userData.location = results[0].address_components[0].short_name + ', ' + results[0].address_components[1].short_name + ', ' + results[0].address_components[2].short_name;
                    //console.log(results[0])
                }
            }
        });
    }
}])
