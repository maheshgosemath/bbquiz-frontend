(function () {

    'use strict';

    angular.module('app.error')
        .directive('tmplError', directiveFunction)
        .controller('ErrorController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {


        var directive = {
            restrict: 'E',
            templateUrl: 'components/error/error.html',
            scope: {},
            controller: 'ErrorController',
            controllerAs: 'vm'
        };

        return directive;
    }

    ControllerFunction.$inject = ['$rootScope', '$scope'];

    /* @ngInject */
    function ControllerFunction($rootScope, $scope) {
        var vm = this;
        vm.errorheader = '';
        vm.errormsg = '';
        $rootScope.errormsg='';
        $rootScope.errorheader='';

        $rootScope.$watch("errorheader", function(newValue, oldValue) {
            if(newValue != oldValue && newValue) {
                vm.errorheader = newValue;
            }
        });
        $rootScope.$watch("errormsg", function(newValue, oldValue) {
            if(newValue != oldValue && newValue) {
                vm.errormsg = newValue;
            }
        });
    }
})();
