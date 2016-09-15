(function() {
    'use strict';

    function websocketLogPanel() {
        return {
            restrict: 'E',
            templateUrl: '/app/ui/eventlog/websocket/websocket.log.directive.html',
            controller: 'WebsocketLogController',
            controllerAs: 'vm' 
        };
    }

    angular.module('eventingClient')
        .directive('websocketLogPanel', websocketLogPanel);
})();
