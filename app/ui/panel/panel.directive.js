(function() {
    'use strict';

    function panelDirective() {
        return {
            restrict: 'E',
            templateUrl: '/app/ui/panel/panel.directive.html',
            controller: 'PanelCtrl',
            controllerAs: 'vm'
        };
    }

    angular.module('eventingClient')
        .directive('panelDirective', panelDirective);
})();
