(function () {

    'use strict';

    angular.module('app.verify')
        .directive('tmplVerify', directiveFunction)
        .controller('VerifyController', ControllerFunction)


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/verify/verify.html',
            scope: {},
            controller: 'VerifyController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state', 'HttpService'];

    /* @ngInject */
    function ControllerFunction($state, HttpService) {

        var vm = this;
        var token;

        if($state && $state.params && $state.params.token) {
            token = $state.params.token;
        } else {
            $state.transitionTo('error');
        }

        var data = {
            token: token
        };
        var httpObj = new HttpService("brainbout");
        httpObj.post("emailverify", data).then(function(response) {
            if(response.status == 'VERIFY_SUCCESS') {
                vm.status = 'success';
            } else {
                if(response.status == 'INVALID_TOKEN') {
                    vm.status = 'invalid';
                } else {
                    if(response.status == 'EXISTING_EMAIL') {
                        vm.status = 'verified';
                    }
                }
            }
        });

        vm.gotoLogin = function() {
            $state.transitionTo('home');
        }
    }
})();
