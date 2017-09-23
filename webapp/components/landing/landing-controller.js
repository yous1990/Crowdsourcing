myApp.controller('LandingCityCtrl', ['$scope', '$state', '$timeout', 'LandingService', 'Continents', 'Countries', 'state', function ($scope, $state, $timeout, LandingService, Continents, Countries, state) {
    "use strict";

    $scope.continents = Continents;
    $scope.countries = Countries;
    $scope.myCity = {};

    $scope.selectContinent = function(){
        var continentName = JSON.parse($scope.myContinent).id;
        $scope.countries = _.filter(Countries, {continent: continentName})
    };

    $scope.loadCities = function(){
        LandingService.getCountryCities(JSON.parse($scope.myCountry).code)
            .then(function(cities){
                $scope.cities = cities.data;
                if(!$scope.cities.length){
                    alert('Aucune Ville n\' été ajoutée pour ce pays. Ajoutez votre ville!');
                }
            });
    };

    $scope.showCityMap = function(){
        var myCity = JSON.parse($scope.myCity);
        $state.go('cityMap', {id: myCity._id});
    };

}]);