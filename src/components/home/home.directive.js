(function () {

    'use strict';

    angular.module('app.home',['ngCookies'])
        .directive('tmplHome', directiveFunction)
        .controller('HomeController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/home/home.html',
            scope: {
            },
            controller: 'HomeController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state', 'HttpService', '$cookieStore','$rootScope', 'userService', 'errorService'];

    /* @ngInject */
    function ControllerFunction($state, HttpService, $cookies,$rootScope, userService, errorService) {

        var vm = this;
        vm.handleSubmit = handleSubmit;
        $state.username='';
        var ref;

        clearCookie();

        if($state && $state.params && $state.params.ref) {
            ref = $state.params.ref;
        } else {
            $state.transitionTo('error');
        }
        var httpObj = new HttpService("brainbout");

        httpObj.get("login", {ref:ref}).then(function(response) {
            if(response.competitionStatus == 'competition_closed') {
                errorService.addError('The requested competition is closed now', 'Competition closed');
                $state.transitionTo('error');
            }
            if(response.competitionStatus == 'competition_not_started') {
                errorService.addError('The requested competition has not started yet', 'Competition not started');
                $state.transitionTo('error');
            }
            var obj = new Object();
            obj.companySeq = response.companySeq;
            obj.competitionSeq = response.competitionSeq;
            $cookies.put('compinfo', obj);
        });

        function handleSubmit() {
            var obj = $cookies.get('compinfo');
            var data = {
                name: vm.title,
                email: vm.email,
                companySeq: obj.companySeq,
                competitionSeq: obj.competitionSeq
            };

            httpObj.post("register", data).then(function(jsonResp){
                putUserInfo();
                if(jsonResp.userStatus == 'USERNOTELIGIBLE') {
                    errorService.addError('Your are not eligible to register for this event', 'Error');
                    $state.transitionTo('error');
                } else {
                    if (jsonResp.userStatus == 'submitted') {
                        $state.transitionTo("finalScreen");
                    } else {
                        if (jsonResp.timeLeft > 0) {
                            $state.transitionTo("introduction");
                        } else {
                            errorService.addError('Your quiz time is over', 'Error');
                            $state.transitionTo('error');
                        }
                    }
                }
            });
        }

        function putUserInfo() {
            var obj = new Object();
            obj.name=vm.title;
            obj.email=vm.email;
            $rootScope.username = vm.title;
            $cookies.put('userinfo', obj);
            userService.addUsername(vm.title);
        }

        function clearCookie() {
            $cookies.remove('userinfo');
            $cookies.remove('compinfo');
            $cookies.remove('pointer');
            $cookies.remove('submissionResult');
            $cookies.remove('useranswer');
            $cookies.remove('quizList');
        }
    }
})();
