(function() {
    'use strict';

    function EventsService($http, ApiService, baseUrl) {

        this.getEventLog = function() {
            return $http({
                    method: 'GET',
                    url: baseUrl + '/eventLog'
                })
                .then(function(res) {
                    return res.data;
                });
        };

        this.getEventsForSubscription = function(subscription) {
            return $http({
                    method: 'GET',
                    url: baseUrl + '/eventLog/' + subscription.id
                })
                .then(function(res) {
                    return res.data;
                });
        };

    }

    angular.module('eventingClient')
        .service('EventsService', EventsService);
})();
