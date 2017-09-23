myApp.service('IncidentDetailsService', ['$http', function ($http){
    "use strict";
    return {
        getIncidentDetails: function (incidentId){
            return $http({
                method: 'GET',
                url: '/incidents/' + incidentId
            });
        },
        appreciate: function (incidentId){
            return $http({
                method: 'PUT',
                url: '/incidents/' + incidentId + '/appreciate'
            });
        },
        depreciate: function (incidentId){
            return $http({
                method: 'PUT',
                url: '/incidents/' + incidentId + '/depreciate'
            });
        },
        modify: function (incidentId){
            alert('la modification est en cours de implementation');
            //return $http({
            //    method: 'GET',
            //    url: '/incidents/' + incidentId
            //});
        },
    };
}]);
