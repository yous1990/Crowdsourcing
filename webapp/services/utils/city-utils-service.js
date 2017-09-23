myApp.service('CityUtilsService', ['state', function (state) {
    "use strict";

    var setChosenCity = function setChosenCity (city){
        state.currentCity = city;
    };

    return {
        setChosenCity: setChosenCity
    };
}]);