(function () {

    'use strict';

    angular.module('app.register', ['ngCookies'])
        .directive('tmplRegister', directiveFunction)
        .controller('RegisterController', ControllerFunction)
        .directive('passwordVerify', function() {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function(scope, elem, attrs, ngModel) {
                    if (!ngModel) return;
                    scope.$watch(attrs.ngModel, function() {
                        validate();
                    });
                    attrs.$observe('passwordVerify', function(val) {
                        validate();
                    });
                    var validate = function() {
                        var val1 = ngModel.$viewValue;
                        var val2 = attrs.passwordVerify;
                        ngModel.$setValidity('passwordVerify', val1 === val2);
                    };
                }
            };
        });


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
    ControllerFunction.$inject = ['$state', 'HttpService', '$scope', 'errorService'];

    /* @ngInject */
    function ControllerFunction($state, HttpService, $scope, errorService) {

        var vm = this;
        vm.gotoLogin = function () {
            $state.transitionTo('home');
        };

        var httpObj = new HttpService("brainbout");
        httpObj.get("companylist").then(function(response) {
            vm.companyList = response.companyList;
        });

        vm.handleSubmit = function() {
            var data = JSON.stringify(vm.userData);
            var httpObj = new HttpService("brainbout");
            httpObj.post("signup", data).then(function(response) {
                if(response.status == 'success') {
                    alert("Registration successful");
                    $state.transitionTo('home');
                } else {
                    alert(response.msg);
                }
            });
        }
    }
})();
