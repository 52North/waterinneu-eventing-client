(function() {
    'use strict';

    angular.module('eventingClient', ['ngMaterial', 'ui-leaflet', 'ngWebSocket', 'mdPickers'])
        .controller('MainCtrl', function($scope, leafletData) {

        })
        .run(function() {
            console.log('yea! is running');
        });
})();
