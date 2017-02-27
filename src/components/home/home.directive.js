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
    ControllerFunction.$inject = ['$state', 'HttpService', '$cookieStore'];

    /* @ngInject */
    function ControllerFunction($state, HttpService, $cookies) {

        var vm = this;
        vm.handleSubmit = handleSubmit;
        $state.username='';

        clearCookie();

        var httpObj = new HttpService("brainbout");

        httpObj.get("login", {ref:"abcdefgh"}).then(function(response) {
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
                if(jsonResp.userStatus == 'submitted') {
                    $state.transitionTo("finalScreen");
                }
                if(jsonResp.timeLeft > 0) {
                    $state.transitionTo("introduction");
                } else {
                    alert('Your quiz time is over');
                }
            });
        }

        function putUserInfo() {
            var obj = new Object();
            obj.name=vm.title;
            obj.email=vm.email;
            $cookies.put('userinfo', obj);
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
