(function() {

    'use strict';

    angular.module('app.toolbar', ['timer'])
        .controller('ToolbarController', ControllerFunction);


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$mdDialog','$cookieStore', '$rootScope', '$scope'];

    /* @ngInject */
    function ControllerFunction($mdDialog, $cookieStore, $rootScope, $scope) {

        var vm = this;
        var userObj = $cookieStore.get('userinfo');
        vm.quizTimer = 1;
        if (userObj) {
            vm.username = userObj.name;
        }
        $rootScope.$watch("username", function(newValue, oldValue) {
            if(oldValue != newValue && newValue != '') {
                vm.username = newValue;
            }
        });
        $rootScope.$watch("quizTimer", function(newValue, oldValue) {
            if(oldValue !== newValue && newValue) {
                vm.quizTimer = -1;
                $scope.$broadcast('timer-add-cd-seconds', newValue * 60);
                $scope.$broadcast('timer-start');
                $scope.timerRunning = true;
            }
        });
    }

})();
