(function() {
    'use strict';

    function EventDialogCtrl($scope, $mdDialog, EventsService, subscription) {
        $scope.subscription = subscription;
        $scope.events = [];

        $scope.close = function() {
            $mdDialog.hide();
        }

        EventsService.getEventsForSubscription(subscription)
            .then(function(events) {
                console.log('successfully retrieved events');
                $scope.events = events;
            }, function(err) {
                console.log('error while retrieving events for subscription ' + subscription.id);
                console.log(err);
            });
    }

    angular.module('eventingClient')
        .controller('EventDialogCtrl', EventDialogCtrl);
})();
