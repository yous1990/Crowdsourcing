myApp.service('AddIncidentService', ['$http', function ($http) {
    "use strict";

    return {
        addNewIncident: function(newIncident){
            return $http({
                method: 'POST',
                url: '/incidents',
                data: newIncident
            });
        }
    }
}]);