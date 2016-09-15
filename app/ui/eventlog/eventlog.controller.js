(function() {
    'use strict';

    function EventlogCtrl($scope, $timeout, EventsService) {
        var vm = this;
        vm.events = [{
            id: "4ba93ac2-f945-4064-85cb-b6cb6eef47ef_match_1",
            time: "2016-09-06T11:23:52.039Z",
            subscriptionId: "4ba93ac2-f945-4064-85cb-b6cb6eef47ef",
            label: "Rule match for Template 'pointInPolygon' with Parameters: {coordinates=52.70673718404873 -2.5835680961608887}",
            href: "http://localhost:8080/webapp/v1/eventLog/4ba93ac2-f945-4064-85cb-b6cb6eef47ef/4ba93ac2-f945-4064-85cb-b6cb6eef47ef_match_1"
        }];

        EventsService.getEventLog()
            .then(function(events) {
                console.log(events);
                vm.events = events;

                $timeout(function(){
                  $scope.$apply();
                }, 50);
            }, function(err) {
                console.log("error while retrieving eventlog: " + err);
            });
    }

    angular.module('eventingClient')
        .controller('EventlogCtrl', EventlogCtrl);
})();
