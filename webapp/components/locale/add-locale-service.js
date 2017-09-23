myApp.service('AddLocaleService', ['$http', function ($http) {
    "use strict";

    return {
        addNewLocale: function(newLocale){
            return $http({
                method: 'POST',
                url: '/locales',
                data: newLocale
            });
        }
    }
}]);