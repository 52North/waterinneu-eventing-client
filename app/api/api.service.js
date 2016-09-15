(function() {
    'use strict';

    function ApiService($http, baseUrl) {
        var vm = this;

        var getDeliveryMethodsList = function() {
            return $http({
                method: 'GET',
                cache: true,
                url: baseUrl + '/deliveryMethods'
            });
        }

        this.getDeliveryMethod = function(method) {
            return $http({
                    method: 'GET',
                    cache: true,
                    url: baseUrl + '/deliveryMethods/' + method.id
                })
                .then(function(res) {
                    return res.data;
                });
        }

        this.getDeliveryMethods = function() {
            return getDeliveryMethodsList()
                .then(function(res, status) {
                    var deliveryMethods = res.data;
                    return Promise.all(deliveryMethods.map(vm.getDeliveryMethod));
                });
        }

        this.getEventLog = function() {
            $http({
                method: 'GET',
                url: baseUrl + '/eventLog'
            }).then(function success(res) {
                console.log(res);
            }, function error(err) {
                console.log(err);
            });
        };

        this.getPublications = function() {
            $http({
                method: 'GET',
                url: baseUrl + '/publications'
            }).then(function success(res) {
                console.log(res);
            }, function error(err) {
                console.log(err);
            });
        };

        this.getTemplates = function() {
            return $http({
                method: 'GET',
                cache: true,
                url: baseUrl + '/templates'
            });
        };
    }

    angular.module('eventingClient')
        .value('baseUrl', 'http://pilot.52north.org/wieu-eventing-rest-api/dev/v1')
        .service('ApiService', ApiService);
})();
