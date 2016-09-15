(function() {
    'use strict';

    function MapCtrl($scope, $mdDialog, $mdToast, WebsockerHandler, SubscriptionService, leafletData) {
        angular.extend($scope, {
            london: {
                lat: 51.505,
                lng: -0.09,
                zoom: 4
            },
            events: {}
        });

        $scope.markers = new Array();
        $scope.subscriptions = [];

        $scope.$on('subscriptions:add', function(event, data) {
            loadMapStatus();
        });

        $scope.$on('subscriptions:delete', function(event, data) {
            loadMapStatus();
        });

        $scope.$on('subscriptions:hover', function(event, data) {
            focusOnMarker(data.id);
        });

        $scope.$on('subscriptions:event', function(event, data) {
            focusOnMarker(data.subscriptionId);
        });

        $scope.$on('subscriptions:click', function(event, data){
            console.log('focusing on marker ' + data.id);
            focusOnMarker(data.id);
        });

        $scope.$on('leafletDirectiveMap.click', function(event, args) {
            var leafEvent = args.leafletEvent;

            $mdDialog.show({
                controller: 'AddSubscriptionDialogCtrl',
                templateUrl: '/app/ui/subscription/dialog/add.subscription.dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals: {
                    latlng: leafEvent.latlng
                }
            }).then(function(answer) {
                console.log(answer);

                SubscriptionService.subscribe(answer)
                    .then(function(subscription) {
                        $scope.markers.push(createMarker(subscription));
                        $mdToast.show(
                            $mdToast.simple()
                            .textContent('Subscription successfully added')
                            .hideDelay(3000)
                        );
                    }, function(err) {
                        console.log(err);
                    });

            }, function(err) {
                console.log('cancelled ' + err);
            });
        });

        function createMarker(subscription) {
            var latlng = subscription.template.parameters.coordinates.value.split(" ");

            var locat = "<md-icon class='material-icons'>place</md-icon> " + latlng[0] + " " + latlng[1] + "<br>";
            var label = "<strong>Label:</strong> " + subscription.label + "<br>";
            var pubid = "<strong>Publication ID:</strong> " + subscription.publicationId + "<br>";
            var deliv = "<strong>Delivery Methods</strong><br>";

            subscription.deliveryMethods.forEach(function(m) {
                deliv += m.id + "</br>";
            });

            var message = label + pubid + deliv;
            return {
                id: subscription.id,
                lat: Number(latlng[0]),
                lng: Number(latlng[1]),
                message: message
            };
        }

        function loadMapStatus() {
            console.log('loadMapStatus');
            SubscriptionService.getSubscriptions()
                .then(function(subscriptions) {

                    $scope.subscriptions = subscriptions;
                    $scope.markers.splice(0, $scope.markers.length);

                    if (subscriptions) {
                        subscriptions.forEach(function(subscription) {
                            $scope.markers.push(createMarker(subscription));
                        });
                    }

                }, function(err) {
                    console.log(err);
                });
        }

        function focusOnMarker(subscriptionId) {
            $scope.markers.forEach(function(m) {
                m.focus = false;
                if (m.id === subscriptionId) {
                    m.focus = true;
                }
            });
        }

        loadMapStatus();
    };

    angular.module('eventingClient')
        .controller('MapCtrl', MapCtrl);
})();
