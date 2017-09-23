myApp.controller('AdministrationCtrl', ['AdministrationService', '$scope', function (AdministrationService, $scope) {
    "use strict";

    function getAllIncidents() {
        return AdministrationService.getAllIncidents()//promise
                                    .then(function (resp) {
                                        $scope.incidents = resp.data;
                                    }, function (err) {
                                        alert("liste introuvable");
                                    });
    }

    var socket = io.connect('http://localhost:3000');
    socket.on("newIncidentHappened", function (recentIncident) {
        $scope.incidents.push(recentIncident);
        //lancer un processus de digestion angular pour mettre à jour l'affichage
        //car l'ajout du nouvel incident s'est fait hors le contexte angular
        $scope.$apply();
    });

    socket.on("incidentCredibilityChanged", function (incidentWithNewCredibility) {
        getAllIncidents();
    });

    getAllIncidents();
    $scope.deleteIncidentCtrl = function (incident) {
        AdministrationService.deleteIncidentSvc(incident._id)
                             .then(function (resp) {
                                     getAllIncidents().then(function () {
                                         console.log("l'incident a été supprimé")
                                     });
                                 }
                                 , function (err) {
                                     alert(err);
                                 });

    }


}]);