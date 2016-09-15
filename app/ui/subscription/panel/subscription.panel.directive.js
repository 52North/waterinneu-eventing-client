(function() {
    'use strict';

    function subscriptionPanel() {
        return {
            restrict: 'E',
            templateUrl: '/app/ui/subscription/panel/subscription.panel.directive.html',
            controller: 'SubscriptionPanelCtrl',
            controllerAs: 'vm',
            
        };
    }

    angular.module('eventingClient')
        .directive('subscriptionPanel', subscriptionPanel);
})();
