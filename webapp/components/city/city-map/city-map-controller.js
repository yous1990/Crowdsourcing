myApp.controller('CityMapCtrl', ['$scope', 'CityMapService', 'incidentsCategories', '$stateParams', 'CityUtilsService', 'LocaleUtilsService', function ($scope, CityMapService, incidentsCategories, $stateParams, CityUtilsService, LocaleUtilsService) {
    "use strict";

    //sera utilisé dans le html
    $scope.allCategories = incidentsCategories;
    var map;
    var clusteringLayer = new L.MarkerClusterGroup();
    var allLayers = {};
    //on crée une nouvelle couche pour chaque catégorie
    for (var i = 0; i < incidentsCategories.length; i++) {
        allLayers[incidentsCategories[i].categ] = new L.LayerGroup();
    }

    CityMapService.getCity($stateParams.id).then(function (city) {
                      var myCity = city.data;
                      CityUtilsService.setChosenCity(myCity);
                      var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFhbGVqIiwiYSI6ImNqMW56NnF4MTAwMXYycWxhbGR2cmtsNjUifQ.PntcZ874h_UkeYbndiILBA';
                      var streets = L.tileLayer(mbUrl, {id: 'mapbox.streets'});
                      map = L.map('city-map', {
                          center: [myCity.position.latitude, myCity.position.longitude],
                          zoom: myCity.zoomLevel || 10,
                          layers: [streets]
                      });
                  })
                  .then(function () {
                      return CityMapService.getCityIncidents($stateParams.id);
                  })
                  .then(function (resp) {
                      _.each(resp.data, function (incident) {
                          L.marker([incident.position.latitude, incident.position.longitude])
                           .bindPopup('<a href="#/incidents/' + incident._id + '">' + incident.name + '</a>')
                           .openPopup()
                           //ajouter l'incident à la couche qui correspond à sa catégorie
                           .addTo(allLayers[incident.category.categ]);
                      });
                      _.each(_.values(allLayers), function (layer) {
                          clusteringLayer.addLayer(layer);
                      });

                      map.addLayer(clusteringLayer)
                  })
                  .then(function () {
                      return CityMapService.getCityLocales($stateParams.id);
                  })
                  .then(function (resp) {
                      var localesLayer = new L.LayerGroup();
                      _.each(resp.data, function (locale) {
                          L.marker([locale.position.latitude, locale.position.longitude], {icon: LocaleUtilsService.getLocaleIcon(locale.category)})
                           .bindPopup('<b>Nom: </b>' + locale.name + '<br/><b>Tél: </b>' + locale.tel)
                           .openPopup()
                           .addTo(localesLayer);
                      });
                      map.addLayer(localesLayer);
                  });

    var socket = io.connect('http://localhost:3000');
    socket.on('newIncidentHappened', function (recentIncident) {
        L.marker([recentIncident.position.latitude, recentIncident.position.longitude])
         .bindPopup('<a href="#/incidents/' + recentIncident._id + '">' + recentIncident.name + '</a>')
         .addTo(allLayers[recentIncident.category.categ]);

        clusteringLayer.removeLayer(allLayers[recentIncident.category.categ]);
        clusteringLayer.addLayer(allLayers[recentIncident.category.categ]);

    });

    //supprimer toutes les couches existantes
    function removeAllLayers() {
        _.forIn(allLayers, function (value, key) {
            clusteringLayer.removeLayer(allLayers[key]);
        });
    }

    //sera exécutée au changement du filtre
    $scope.applySelectedFilter = function applySelectedFilter() {
        removeAllLayers();
        //si la catégorie sélectionnée est "Tout" alors afficher toutes les couches
        if (JSON.parse($scope.selectedCategory).categ === 'all') {
            _.forIn(allLayers, function (value, key) {
                clusteringLayer.addLayer(allLayers[key]);
            });
        }
        //sinon n'afficher que celle qui correspond au filtre sélectionné
        else {
            clusteringLayer.addLayer(allLayers[JSON.parse($scope.selectedCategory).categ]);
        }
    };

    //calcul des nombre de markers par catégorie
    $scope.calculateMarkers = function (category) {
        if (category.categ === 'all') {
            return _.reduce(allLayers, function (sum, layer) {
                return sum + layer.getLayers().length;
            }, 0);
        }
        return allLayers[category.categ].getLayers().length;
    }
}]);
