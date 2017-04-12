(function() {

    'use strict';

    angular.module('app.toolbar', ['timer'])
        .controller('ToolbarController', ControllerFunction);


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state','$mdDialog','$cookieStore', '$rootScope', '$scope', 'HttpService', '$location'];

    /* @ngInject */
    function ControllerFunction($state, $mdDialog, $cookieStore, $rootScope, $scope, HttpService, $location) {

        var vm = this;
        var userObj = $cookieStore.get('userinfo');
        vm.quizTimer = 1;
        if (userObj) {
            vm.username = userObj.name;
        }
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            // Check if current user has group access
            vm.isDashboard = toState.name == 'dashboard';
        });

        $rootScope.$watch("username", function(newValue, oldValue) {
            if(oldValue != newValue && newValue != '') {
                vm.username = newValue;
            } else {
                if(newValue == '') {
                    vm.username = '';
                }
            }
        });
        $rootScope.$watch("quizTimer", function(newValue, oldValue) {
            if(oldValue !== newValue && newValue) {
                if(newValue == 1) {
                    vm.quizTimer = 1;
                    $scope.$broadcast('timer-reset');
                } else {
                    vm.quizTimer = newValue;
                    $scope.$broadcast('timer-reset');
                    $scope.$broadcast('timer-add-cd-seconds', newValue);
                    setTimeout(function () {
                        $scope.timerRunning = true;
                        $scope.$broadcast('timer-start');
                    }, 500);
                }
            }
        });

        $rootScope.$watch("timerStatus", function(newValue, oldValue) {
            if(oldValue !== newValue && newValue) {
                if(newValue == 'stop') {
                    $scope.$broadcast('timer-stop');
                    $scope.timerRunning = false;
                    $scope.$broadcast('timer-reset');
                }
            }
        });

        vm.show_dashbaord = function() {
            if($location.path() != '/' && $location.path() != 'register' &&
                $location.path() != 'verify') {
                $state.transitionTo('dashboard');
            }
        };

        vm.logout = function() {
            var config = {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            };
            var httpObj = new HttpService("brainbout");
            httpObj.post("j_spring_security_logout", {}, config).then(function(jsonResp){
                clearCookie();
                $rootScope.username='';
                $rootScope.quizTimer=1
                $state.transitionTo('home');
            });
        };

        function clearCookie() {
            $cookieStore.remove('userinfo');
            $cookieStore.remove('compinfo');
            $cookieStore.remove('pointer');
            $cookieStore.remove('submissionResult');
            $cookieStore.remove('useranswer');
            $cookieStore.remove('quizList');
        }

        vm.enter_quiz_demo = function () {
            $state.transitionTo('introductionDemo');
        }
    }

})();
