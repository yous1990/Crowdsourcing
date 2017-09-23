myApp.controller('AddLocaleCtrl', ['$scope', '$state', '$timeout', 'AddLocaleService', 'localesCategories', 'CityUtilsService', 'state', 'LocaleUtilsService', function ($scope, $state, $timeout, AddLocaleService, localesCategories, CityUtilsService, state, LocaleUtilsService) {
    "use strict";

    $scope.myCity = state.currentCity;
    $scope.localesCategories = localesCategories;
    $scope.newLocale = {
        position:{
            latitude: '' + $scope.myCity.position.latitude,
            longitude: '' + $scope.myCity.position.longitude
        },
        cityId: $scope.myCity._id
    };

    $scope.submitForm = function(){
        $scope.newLocale.category = JSON.parse($scope.newLocale.category);
        var markerPosition = marker.getLatLng();
        $scope.newLocale.position.latitude = '' + markerPosition.lat;
        $scope.newLocale.position.longitude = '' + markerPosition.lng;
        AddLocaleService.addNewLocale($scope.newLocale)
                          .then(function(){
                              $state.go('cityMap', {id: $scope.myCity._id});
                          });
    };

    //map
    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFhbGVqIiwiYSI6ImNqMW56NnF4MTAwMXYycWxhbGR2cmtsNjUifQ.PntcZ874h_UkeYbndiILBA';

    var streets = L.tileLayer(mbUrl, {id: 'mapbox.streets'});

    var map = L.map('add-locale-map', {
        center: [$scope.myCity.position.latitude, $scope.myCity.position.longitude],
        zoom: $scope.myCity.zoomLevel,
        layers: [streets]
    });

    var marker = L.marker([$scope.myCity.position.latitude, $scope.myCity.position.longitude], {draggable: true})
     .addTo(map);


    $scope.updateIcon = function(){
        marker.setIcon(LocaleUtilsService.getLocaleIcon(JSON.parse($scope.newLocale.category)));
    };
}]);
