myApp.service('CityMapService', ['$http', function ($http) {
    "use strict";

    return {
        getCityIncidents: function(cityId){
            return $http.get('/cities/' + cityId + '/incidents');
        },
        getCity: function(cityId){
            return $http.get('/cities/' + cityId);
        },
        getCityLocales: function(cityId){
            return $http.get('/cities/' + cityId + '/locales');
        }
    }
}]);