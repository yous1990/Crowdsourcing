myApp.service('AdministrationService', ['$http', function ($http) {
    "use strict";

    return {
        getAllIncidents: function (){
            return $http({
                method: 'GET',
                url: '/incidents'
            });
        },
        deleteIncidentSvc: function (incidentId ){
            return $http({
                method: 'DELETE',
                url: '/incidents/' + incidentId
            });
        }
    };
}]);