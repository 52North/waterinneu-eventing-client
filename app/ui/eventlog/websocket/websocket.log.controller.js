(function() {
    'use strict';

    function WebsocketLogController($scope) {
        var vm = this;
        vm.receivedEvents = [];
        $scope.$on('subscriptions:event', function(event, data) {
            console.log('event received ' + data);
            vm.receivedEvents.push(data);
        });
    }

    angular.module('eventingClient')
        .controller('WebsocketLogController', WebsocketLogController);
})();
