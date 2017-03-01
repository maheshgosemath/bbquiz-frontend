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

    ControllerFunction.$inject = ['errorService'];

    /* @ngInject */
    function ControllerFunction(errorService) {
        var vm = this;
        vm.errorheader = '';
        vm.errormsg = '';

        var error = errorService.getError();
        if(error.errorMsg && error.errorHeader && error.errorMsg != '' && error.errorHeader != '') {
            vm.errormsg = error.errorMsg;
            vm.errorheader = error.errorHeader;
        } else {
            vm.errorheader = 'Error encountered';
            vm.errormsg = 'Some error has occurred. Please contact support team.';
        }
    }
})();
