myApp.service('LocaleUtilsService', ['state', function (state) {
    "use strict";

    var getLocaleIcon = function setChosenCity (localeCategory){
        var iconAnchorWidth = 20;
        var iconAnchorHeight = 25;
        switch (localeCategory.type){
            case 'police':
                return L.icon({
                    iconUrl: 'assets/images/police-officer.png',
                    iconSize:     [40, 50], // size of the icon
                    iconAnchor:   [iconAnchorWidth, iconAnchorHeight], // point of the icon which will correspond to marker's location
                    popupAnchor:  [0, -iconAnchorHeight] //
                });
                break;
            case 'municipality':
                return L.icon({
                    iconUrl: 'assets/images/municipality.png',
                    iconSize:     [40, 50], // size of the icon
                    iconAnchor:   [iconAnchorWidth, iconAnchorHeight], // point of the icon which will correspond to marker's location
                    popupAnchor:  [0, -iconAnchorHeight] //
                });
                break;
            case 'fire-fighter':
                return L.icon({
                    iconUrl: 'assets/images/fire-fighter.png',
                    iconSize:     [40, 50], // size of the icon
                    iconAnchor:   [iconAnchorWidth, iconAnchorHeight], // point of the icon which will correspond to marker's location
                    popupAnchor:  [0, -iconAnchorHeight] //
                });
                break;
        }
    };

    return {
        getLocaleIcon: getLocaleIcon
    };
}]);