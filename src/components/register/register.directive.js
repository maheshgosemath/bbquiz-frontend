(function () {

    'use strict';

    angular.module('app.register', ['ngCookies'])
        .directive('tmplRegister', directiveFunction)
        .controller('RegisterController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/register/register.html',
            scope: {},
            controller: 'RegisterController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state', 'HttpService', '$cookieStore', '$rootScope', 'userService', 'errorService'];

    /* @ngInject */
    function ControllerFunction($state, HttpService, $cookies, $rootScope, userService, errorService) {

        var vm = this;
        vm.gotoLogin = function () {
            $state.transitionTo('home');
        };
    }
})();
