(function() {
    'use strict';

    function eventlogPanel() {
        return {
            restrict: 'E',
            templateUrl: '/app/ui/eventlog/eventlog.directive.html',
            controller: 'EventlogCtrl',
            controllerAs: 'vm'
        };
    }

    angular.module('eventingClient')
        .directive('eventlogPanel', eventlogPanel);
})();
