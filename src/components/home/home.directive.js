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

        vm.gotoRegister = function(){
            $state.transitionTo('register');
        };

        /*var httpObj = new HttpService("brainbout");

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
        });*/

        function handleSubmit() {
            var data = {
                j_username: vm.email,
                j_password: vm.password
            };
            var config = {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            };
            var httpObj = new HttpService("brainbout");
            httpObj.post("j_spring_security_check", data, config).then(function(jsonResp){
                httpObj.get('userinfo').then(function(response) {
                    if(jsonResp.userStatus == 'submitted') {
                        $state.transitionTo("finalScreen");
                    } else {
                        putUserInfo(response);
                        putCompInfo(response);
                        $state.transitionTo("introduction");
                    }
                });
            });
        };

        function handleSubmitTemp() {
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

        function putUserInfo(data) {
            var obj = new Object();
            obj.name=data.name;
            obj.email=data.email;
            $rootScope.username = data.name;
            $cookies.put('userinfo', obj);
            userService.addUsername(data.name);
        }

        function putCompInfo(data) {
            var obj = new Object();
            obj.companySeq = data.companySeq;
            obj.competitionSeq = data.competitionSeq;
            $cookies.put('compinfo', obj);
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
