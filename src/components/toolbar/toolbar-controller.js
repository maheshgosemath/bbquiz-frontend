(function() {

    'use strict';

    angular.module('app.toolbar', ['timer'])
        .controller('ToolbarController', ControllerFunction);


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state','$mdDialog','$cookieStore', '$rootScope', '$scope'];

    /* @ngInject */
    function ControllerFunction($state, $mdDialog, $cookieStore, $rootScope, $scope) {

        var vm = this;
        var userObj = $cookieStore.get('userinfo');
        vm.quizTimer = 1;
        if (userObj) {
            vm.username = userObj.name;
        }
        $rootScope.$watch("username", function(newValue, oldValue) {
            if(oldValue != newValue && newValue != '') {
                vm.username = newValue;
            } else {
                if(newValue == '') {
                    vm.username = '';
                }
            }
        });
        $rootScope.$watch("quizTimer", function(newValue, oldValue) {
            if(oldValue !== newValue && newValue) {
                $scope.$broadcast('timer-add-cd-seconds', newValue);
                $scope.$broadcast('timer-start');
                vm.quizTimer = newValue;
                $scope.timerRunning = true;
            }
        });
        $rootScope.$watch("timerStatus", function(newValue, oldValue) {
            if(oldValue !== newValue && newValue) {
                if(newValue == 'stop') {
                    $scope.$broadcast('timer-stop');
                    $scope.timerRunning = false;
                }
            }
        });

        vm.show_dashbaord = function() {
            $state.transitionTo('dashboard');
        }
    }

})();
