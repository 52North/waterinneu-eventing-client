(function() {
    'use strict';

    function AddSubscriptionDialogCtrl($scope, $mdDialog, ApiService, latlng) {
        $scope.selectedMethods = [];
        $scope.deliveryMethods = [];

        $scope.currentTime = new Date();
        $scope.currentTime.setTime($scope.currentTime.getTime() + (60 * 60 * 1000));

        var selectedLocation = {
            lat: angular.copy(latlng.lat),
            lng: angular.copy(latlng.lng),
            focus: true,
            message: "Selected Location",
            draggable: true
        };

        angular.extend($scope, {
            center: {
                lat: angular.copy(latlng.lat),
                lng: angular.copy(latlng.lng),
                zoom: 8
            },
            markers: {
                mainMarker: angular.copy(selectedLocation)
            },
            latlng: {
                lat: angular.copy(latlng.lat),
                lng: angular.copy(latlng.lng)
            },
            mapevents: {
                markers: {
                    enable: ['dragend']
                },
                map: {
                    disable: ['click']
                }
            }
        });

        $scope.$on("leafletDirectiveMarker.dragend", function(event, args) {
            $scope.latlng.lat = args.model.lat;
            $scope.latlng.lng = args.model.lng;
        });

        $scope.toggle = function(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        };

        $scope.getParamsForMethod = function(method) {
            var parameters = [];
            for (var key in method.parameters) {
                parameters.push(method.parameters[key]);
            }
            return parameters;
        }

        $scope.exists = function(item, list) {
            return list.indexOf(item) > -1;
        }

        $scope.cancel = function() {
            $mdDialog.cancel();
        }

        $scope.submit = function() {
            $mdDialog.hide({
                label: $scope.label,
                selectedMethods: $scope.selectedMethods,
                latlng: $scope.latlng,
                endOfLife: $scope.currentTime.toISOString()
            });
        }

        ApiService.getDeliveryMethods()
            .then(function(res) {
                console.log('retrieved delivery methods');
                $scope.deliveryMethods = res;
            });
    }

    angular.module('eventingClient')
        .controller('AddSubscriptionDialogCtrl', AddSubscriptionDialogCtrl);
})();
