(function() {
    'use strict';

    function SubscriptionService($http, $q, $cacheFactory, $rootScope, baseUrl, ApiService) {
        var vm = this;
        var cache = $cacheFactory('SubscriptionsCache');

        var setSubscriptions = function(subscriptions) {
            cache.put('subscriptions', subscriptions);
            $rootScope.$broadcast('subscriptions:set', subscriptions);
        }

        var addSubscription = function(subscription) {
            var data = cache.get('subscriptions');
            data.push(subscription);
            cache.put('subscriptions', data);
            $rootScope.$broadcast('subscriptions:add', subscription);
        }

        var removeSubscription = function(subscription) {
            var data = cache.get('subscriptions');
            var index = data.indexOf(subscription);
            data.splice(index, 1);
            cache.put('subscriptions', data);
            $rootScope.$broadcast('subscriptions:delete', data);
        }

        this.subscribe = function(subscriptionDetails) {
            console.log('trying to subscribe');
            var subscription = createSubscriptionObj(subscriptionDetails);

            return $http({
                    method: 'POST',
                    url: baseUrl + '/subscriptions',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(subscription)
                })
                .then(function(res) {
                    return fetchSubscription(res.data);
                })
                .then(function(subscription) {
                    addSubscription(subscription);
                    return subscription;
                });
        };

        this.getSubscriptions = function() {
            var data = cache.get('subscriptions');
            if (!data) {
                return getSubscriptionList()
                    .then(function(subscriptions) {
                        return Promise.all(subscriptions.map(fetchSubscription));
                    })
                    .then(function(result) {
                        setSubscriptions(result);
                        return result;
                    });
            } else {
                return $q(function(resolve, reject) {
                    resolve(data);
                });
            }
        }

        this.deleteSubscription = function(subscription) {
            return $http({
                    method: 'DELETE',
                    url: baseUrl + '/subscriptions/' + subscription.id
                })
                .then(function(res) {
                    console.log('subscription deleted');

                    // delete from local cache
                    removeSubscription(subscription);
                    return subscription;
                });
        }

        function createSubscriptionObj(subscriptionDetails) {
            var result = {
                label: subscriptionDetails.label,
                publicationId: "pip-pub",
                template: {
                    "id": "pointInPolygon",
                    "parameters": {
                        "coordinates": {
                            "value": subscriptionDetails.latlng.lat + " " + subscriptionDetails.latlng.lng
                        }
                    }
                },
                deliveryMethods: [],
                enabled: true,
                endOfLife: subscriptionDetails.endOfLife
            };

            var selectedMethods = subscriptionDetails.selectedMethods;
            selectedMethods.forEach(function(method) {
                var deliveryMethod = {
                    id: method.id,
                    parameters: {}
                };
                var parameters = method.parameters;

                Object.keys(parameters).forEach(function(key, index) {
                    if (parameters[key].value) {
                        deliveryMethod.parameters[key] = {
                            "value": parameters[key].value
                        };
                    } else if (parameters[key].defaultValue) {
                        deliveryMethod.parameters[key] = {
                            "value": parameters[key].defaultValue
                        };
                    }
                });

                result.deliveryMethods.push(deliveryMethod);
            });

            return result;
        }

        function getSubscriptionList() {
            return $http({
                method: 'GET',
                url: baseUrl + '/subscriptions'
            }).then(function(res) {
                return res.data;
            });
        }

        function fetchSubscription(subscription) {
            return $http({
                    method: 'GET',
                    url: baseUrl + '/subscriptions/' + subscription.id
                })
                .then(function(res) {
                    return res.data;
                });
        }
    }

    angular.module('eventingClient')
        .service('SubscriptionService', SubscriptionService);
})();
