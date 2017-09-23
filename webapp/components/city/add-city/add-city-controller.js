myApp.controller('AddCityCtrl', ['$scope', '$state', '$timeout', 'AddCityService', 'Continents', 'Countries', function ($scope, $state, $timeout, AddCityService, Continents, Countries) {
    "use strict";

    $scope.continents = Continents;
    $scope.countries = Countries;

    $scope.newCity = {
        position:{
            latitude:'40.463873', //default position
            longitude:'5.105141'
        }
    };

    $scope.selectContinent = function(){
        var continentName = JSON.parse($scope.newCity.continent).id;
        $scope.countries = _.filter(Countries, {continent: continentName})
    };

    $scope.submitForm = function(){
        $scope.newCity.continent = JSON.parse($scope.newCity.continent);
        $scope.newCity.country = JSON.parse($scope.newCity.country);
        $scope.newCity.zoomLevel = map.getZoom();
        var markerPosition = myMarker.getLatLng();
        $scope.newCity.position.latitude = '' + markerPosition.lat;
        $scope.newCity.position.longitude = '' + markerPosition.lng;
        AddCityService.addNewCity($scope.newCity)
                          .then(function(newCityId){
                              $state.go('cityMap', {id: newCityId.data});
                          });
    };

    //map
    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFhbGVqIiwiYSI6ImNqMW56NnF4MTAwMXYycWxhbGR2cmtsNjUifQ.PntcZ874h_UkeYbndiILBA';

    var streets = L.tileLayer(mbUrl, {id: 'mapbox.streets'});

    var map = L.map('add-city-map', {
        center: [40.463873, 5.105141],
        zoom: 3,
        layers: [streets]
    });

    //enable animation on marker drag and drop
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
        });
    };

    //Marker default Position
    var myMarker = L.marker([40.463873, 5.105141], {draggable: true})
     .animateDragging()
     .addTo(map);

    //get user position from browser
    $scope.getMyPosition = function getMyPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(moveMarkerToMyPosition);
        } else {
            alert('Geolocation is not supported by this browser');
        }
    };

    //update marker position and map view
    function moveMarkerToMyPosition(userPosition){
        var lat = '37.267207';//userPosition.coords.latitude;
        var long = '9.868240'; //userPosition.coords.longitude;
        myMarker.setLatLng([lat, long]);
        map.setView(myMarker.getLatLng(), 10);
    }

}]);
