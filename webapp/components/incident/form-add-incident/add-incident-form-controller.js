myApp.controller('AddIncidentFormCtrl', ['$scope', '$state', '$timeout', 'AddIncidentService', 'incidentsCategories', 'CityUtilsService', 'state', function ($scope, $state, $timeout, AddIncidentService, incidentsCategories, CityUtilsService, state) {
    "use strict";

    $scope.myCity = state.currentCity;
    $scope.allCategories = incidentsCategories.slice(1, incidentsCategories.length);
    $scope.newIncident = {
        position:{
            latitude: '' + $scope.myCity.position.latitude,
            longitude: '' + $scope.myCity.position.longitude
        },
        cityId: $scope.myCity._id
    };

    $scope.submitForm = function(){
        $scope.newIncident.category = JSON.parse($scope.newIncident.category);
        AddIncidentService.addNewIncident($scope.newIncident)
            .then(function(){
                $state.go('cityMap', {id: $scope.myCity._id});
            });
    };

    //map
    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFhbGVqIiwiYSI6ImNqMW56NnF4MTAwMXYycWxhbGR2cmtsNjUifQ.PntcZ874h_UkeYbndiILBA';

    var streets = L.tileLayer(mbUrl, {id: 'mapbox.streets'});

    var map = L.map('add-incident-map', {
        center: [$scope.myCity.position.latitude, $scope.myCity.position.longitude],
        zoom: $scope.myCity.zoomLevel,
        layers: [streets]
    });

    L.Marker.prototype.animateDragging = function () {

        var iconMargin, shadowMargin;

        this.on('dragstart', function () {
            if (!iconMargin) {
                iconMargin = parseInt(L.DomUtil.getStyle(this._icon, 'marginTop'));
                shadowMargin = parseInt(L.DomUtil.getStyle(this._shadow, 'marginLeft'));
            }

            this._icon.style.marginTop = (iconMargin - 15)  + 'px';
            this._shadow.style.marginLeft = (shadowMargin) + 'px';
        });

        return this.on('dragend', function (e) {
            this._icon.style.marginTop = iconMargin + 'px';
            this._shadow.style.marginLeft = shadowMargin + 'px';
            var markerPosition = e.target.getLatLng();
            $timeout(function(){
                $scope.newIncident.position.latitude = '' + markerPosition.lat;
                $scope.newIncident.position.longitude = '' + markerPosition.lng;
            });
        });
    };

    L.marker([$scope.myCity.position.latitude, $scope.myCity.position.longitude], {draggable: true})
     .animateDragging()
     .addTo(map);
}]);
