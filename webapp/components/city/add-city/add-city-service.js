myApp.service('AddCityService', ['$http', function ($http) {
    "use strict";

    return {
        addNewCity: function(newCity){
            return $http({
                method: 'POST',
                url: '/cities',
                data: newCity
            });
        }
    }
}]);