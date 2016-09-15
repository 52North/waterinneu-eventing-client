(function() {
    'use strict';

    function isoToUtc() {
        return function(iso) {
            return new Date(iso).toUTCString();
        };
    }

    angular.module('eventingClient')
        .filter('isoToUtc', isoToUtc);
})();
