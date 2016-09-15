(function() {
    'use strict';

    function WebsockerHandler($websocket, $rootScope, $mdToast) {
        console.log('sending');
        // var ws = $websocket('ws://echo.websocket.org/');
        var ws = $websocket('ws://pilot.52north.org/wieu-eventing-rest-api/dev/asyncStatus/websocket');
        var collection = [];

        ws.onMessage(function(event) {
            console.log('message ', event);
            var data = JSON.parse(event.data);

            $mdToast.show(
                $mdToast.simple()
                .textContent('Received Event for subscription: ' + event.subscriptionId)
                .hideDelay(3000)
            );

            $rootScope.$broadcast('subscriptions:event', data);
        });

        ws.onOpen(function() {
            console.log('connection open');
        });

        ws.onError(function(event) {
            console.log('connection Error', event);
        });

        ws.onClose(function(event) {
            console.log('connection closed', event);
        });

        this.send = function(message) {
            if (angular.isString(message)) {
                ws.send(message);
            } else if (angular.isObject(message)) {
                ws.send(JSON.stringify(message));
            }
        };

        this.status = function() {
            return ws.readyState;
        }


        this.send({
            username: 'wurst',
            message: 'yea'
        });
    }

    angular.module('eventingClient')
        .service('WebsockerHandler', WebsockerHandler);
})();
