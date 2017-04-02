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

        var initTimer = setTimeout(function() {
            clearTimeout(initTimer);
            $rootScope.username='';
            $rootScope.quizTimer=1;
        }, 500);
        vm.selected = false;
        vm.tempGenreList = new Array();
        vm.processing = false;
        $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

        var httpObj = new HttpService("brainbout");
        httpObj.get("companylist").then(function(response) {
            vm.companyList = response.companyList;
        });

        httpObj.get("genredetails").then(function(response) {
            vm.genreList = response.genredetails.slice(0, -1);
        });

        vm.handleSubmit = function() {
            vm.processing = true;
            vm.success = -1;

            vm.userData.genreSeq = vm.tempGenreList;
            var data = JSON.stringify(vm.userData);
            var httpObj = new HttpService("brainbout");
            httpObj.post("signup", data).then(function(response) {
                scrollToMessage();
                vm.processing = false;
                if(response.status == 'success') {
                    clearForm();
                    vm.success = 1;
                    vm.message = 'Registration successful. Please check your mail for verification link.';
                } else {
                    vm.success = 0;
                    if(response.status == 'error' && response.msg) {
                        vm.message = response.msg;
                    } else {
                        vm.message = 'Something went wrong. Please try again.';
                    }
                    $scope.registrationForm.genre.$setViewValue(true);
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

        function clearForm() {
            $scope.registrationForm.$setPristine();
            $scope.registrationForm.$setUntouched();
            vm.userData={};
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
            $document.scrollToElement(someElement, 30, 1000);
        }

        vm.onGenreChange = function(value) {
            var checked = false;
            var idx = vm.tempGenreList.indexOf(value);
            if(vm.tempGenreList.indexOf(value) > -1) {
                vm.tempGenreList.splice(idx, 1);
            } else {
                vm.tempGenreList.push(value);
            }
            if(vm.tempGenreList.length == 2) {
                vm.selected = true;
                checked = true;
            } else {
                vm.selected = false;
            }
            $scope.registrationForm.genre.$setViewValue(checked);
        }
    }
})();
