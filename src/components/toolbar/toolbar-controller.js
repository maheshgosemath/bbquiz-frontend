(function() {

    'use strict';

    angular.module('app.toolbar', ['timer'])
        .controller('ToolbarController', ControllerFunction);


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$mdDialog','$cookieStore', '$rootScope'];

    /* @ngInject */
    function ControllerFunction($mdDialog, $cookieStore, $rootScope) {

        var vm = this;

        var userObj = $cookieStore.get('userinfo');
        if (userObj) {
            vm.username = userObj.name;
        }
        $rootScope.$watch("username", function(newValue, oldValue) {
            if(oldValue != newValue && newValue != '') {
                vm.username = newValue;
            }
        });
        vm.quizTimer;
        $rootScope.$watch("quizTimer", function(newValue, oldValue) {
            if(oldValue !== newValue && newValue) {
                $rootScope.$broadcast('timer-add-cd-seconds', newValue * 60);
                $rootScope.$broadcast('timer-start');
            }
        });
    }

})();
