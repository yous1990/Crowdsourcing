myApp.service('MainService', ['$http', function ($http) {
    "use strict";

    return {
        getAllIncidents: function(){
            return $http.get('/incidents')
        }
    }
}]);