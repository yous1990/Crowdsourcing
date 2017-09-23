myApp.controller('IncidentDetailCtrl', ['IncidentDetailsService', '$scope', '$stateParams', function (IncidentDetailsService, $scope, $stateParams) {
    "use strict";


    function createMap(incident){
        //pour convertir une String en Number on utilise +
        var _latitude = incident.position.latitude;
        var _longitude = incident.position.longitude;

        var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

        var streets = L.tileLayer(mbUrl, {id: 'mapbox.streets'});

        var map = L.map('incident-details-map', {
            center: [_latitude, _longitude],
            zoom: 15,
            layers: [streets]
        });

        L.marker([_latitude, _longitude])
         .addTo(map);
    }

    function loadAnIncident(incidentId) {
        return IncidentDetailsService.getIncidentDetails(incidentId)
                              .then(function (resp) {
                                  //créer mon modèle et l'afficher dans la vue
                                  $scope.incident = resp.data;
                                  return resp.data;
                              }, function (err) {

                                  alert('Cet incident n\'existe pas');
                                  console.log('getIncidentDetails', err);

                              });
    }

    $scope.appreciate = function (incident) {
        IncidentDetailsService.appreciate(incident._id)
                              .then(function(){
                                  loadAnIncident(incident._id);
                              });
    };

    $scope.depreciate = function (incident) {
        IncidentDetailsService.depreciate(incident._id)
                              .then(function(){
                                  loadAnIncident(incident._id);
                              });
    };

    $scope.modify = function (incident) {
        //IncidentDetailsService.modify(incident._id)
        //                      .then(function(){
        //    loadAnIncident(incident._id);
        //});
    };

    var socket = io.connect('http://localhost:3000');
    socket.on("incidentCredibilityChanged", function (incidentWithNewCredibility) {
        loadAnIncident($stateParams.id);
    });

    loadAnIncident($stateParams.id)
        .then(createMap);
}]);