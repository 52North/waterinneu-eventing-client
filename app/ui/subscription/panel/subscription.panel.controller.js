(function() {
    'use strict';

    function SubscriptionPanelCtrl($rootScope, $scope, $mdDialog, SubscriptionService) {
        var vm = this;

        $scope.subscriptions = [];

        function loadSubscriptions() {
            SubscriptionService.getSubscriptions()
                .then(function(res) {
                    console.log('Subscriptions successfully loaded');
                    $scope.subscriptions = res;
                }, function(err) {
                    console.log('Error while loading subscriptions ' + err);
                });
        }

        $scope.deleteSubscription = function(subscription) {
            console.log('Trying to delete subscription');
            SubscriptionService.deleteSubscription(subscription)
                .then(function(res) {
                    console.log('subscription with id=' + subscription.id + ' has been deleted.');
                }, function(err) {
                    console.log('error while deleting ' + err);
                });
        };

        $scope.showEventsDialog = function(subscription) {
            console.log('yea clicked');
            $mdDialog.show({
                    controller: 'EventDialogCtrl',
                    templateUrl: '/app/ui/eventlog/dialog/event.dialog.directive.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    locals: {
                        subscription: subscription
                    }
                })
                .then(function(answer) {

                }, function() {
                    console.log('dialog has been canceled');
                });
        };

        $scope.onHover = function($event, subscription) {
            $rootScope.$broadcast('subscriptions:hover', subscription);
        }

        loadSubscriptions();
    }

    angular.module('eventingClient')
        .controller('SubscriptionPanelCtrl', SubscriptionPanelCtrl);
})();
