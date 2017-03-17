(function () {

    'use strict';

    angular.module('app.player', ['ngCookies'])
        .directive('tmplPlayer', directiveFunction)
        .controller('PlayerController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/player/player.html',
            scope: {},
            controller: 'PlayerController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state', 'HttpService', '$cookieStore', '$rootScope', 'userService', 'errorService'];

    /* @ngInject */
    function ControllerFunction($state, HttpService, $cookies, $rootScope, userService, errorService) {

        var vm = this;
        vm.selectPlayer = function (id) {

        };


    }
})();
