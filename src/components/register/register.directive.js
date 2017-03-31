(function () {

    'use strict';

    angular.module('app.register', ['ngCookies', 'ngMessages', 'duScroll'])
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
    ControllerFunction.$inject = ['$state', 'HttpService', '$rootScope', '$scope', 'errorService', '$mdToast', '$document'];

    /* @ngInject */
    function ControllerFunction($state, HttpService, $rootScope, $scope, errorService, $mdToast, $document) {

        var vm = this;
        vm.success = -1;
        vm.gotoLogin = function () {
            $state.transitionTo('home');
        };
        $rootScope.username = '';
        $rootScope.quizTimer = 1;

        var httpObj = new HttpService("brainbout");
        httpObj.get("companylist").then(function(response) {
            vm.companyList = response.companyList;
        });

        httpObj.get("genredetails").then(function(response) {
            vm.genreList = response.genredetails;
        });

        vm.handleSubmit = function() {
            vm.success = -1;
            console.log(vm.userData.interests);
            var data = JSON.stringify(vm.userData);
            var httpObj = new HttpService("brainbout");
            httpObj.post("signup", data).then(function(response) {
                scrollToMessage();
                if(response.status == 'success') {
                    $scope.registrationForm.$setPristine();
                    $scope.registrationForm.$setUntouched();
                    vm.userData={};
                    vm.success = 1;
                    vm.message = 'Registration successful. Please check your mail for verification link.';
                } else {
                    vm.success = 0;
                    vm.message = 'Something went wrong. Please try again.';
                }
            });
        };

        vm.changeCompany = function() {
            var data = {companySeq: vm.userData.companySeq}
            var httpObj = new HttpService("brainbout");
            httpObj.get("companylocations", data).then(function(response) {
                vm.locationList = response.companylocations;
            });
        }

        vm.changeGenre = function() {
            console.log(vm.userData.interests);
        }

        function showMessage(msg) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .position('top center')
                    .hideDelay(3000)
            );
        }

        function scrollToMessage() {
            var someElement = angular.element(document.getElementById('registration_header'));
            $document.scrollToElement(someElement, 30, 2000);
        }
    }
})();
