myApp.service('LandingService', ['$http', function ($http) {
    "use strict";

    return {
        getCountryCities: function(countryCode){
            return $http({
                method: 'GET',
                url: '/cities/?country=' + countryCode
            });
        }
    };
}]);