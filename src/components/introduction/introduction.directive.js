(function () {

    'use strict';

    angular.module('app.introduction', ['ngCookies'])
        .directive('tmplIntroduction', directiveFunction)
        .directive('demoIntroduction', demoDirectiveFunction)
        .controller('IntroductionController', ControllerFunction)
        .controller('DemoIntroductionController', DemoControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];
    demoDirectiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/introduction/introduction.html',
            scope: {},
            controller: 'IntroductionController',
            controllerAs: 'vm'
        };

        return directive;
    }

    function demoDirectiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/introduction/demo.introduction.html',
            scope: {},
            controller: 'DemoIntroductionController',
            controllerAs: 'vm'
        };
        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state', 'HttpService', '$cookieStore'];
    DemoControllerFunction.$inject = ['$state'];

    function DemoControllerFunction($state) {
        var vm = this;
        vm.startDemoQuiz = function () {
            $state.transitionTo('question1Demo');
        };
        vm.data = {
            competitionTitle:"Edelweiss Brain Bout Inter-Corporate Quiz",
            competitionSubTitle:"Season 2"
        }
    }

    /* @ngInject */
    function ControllerFunction($state, HttpService, $cookieStore) {

        var vm = this;
        var obj = $cookieStore.get('compinfo');
        var userObj = $cookieStore.get('userinfo');
        if (!userObj) {
            $state.transitionTo('home');
        }

        if (obj && userObj) {
            if (!obj.competitionSeq) {
                $state.transitionTo('dashboard');
            } else {
                var httpObj = new HttpService("brainbout");
                var data = {
                    companySeq: obj.companySeq,
                    competitionSeq: obj.competitionSeq
                }
                httpObj.get("usercompetitiondetails", data).then(function (response) {
                    vm.data = response.competitiondetails;
                });
            }
        }

        vm.startQuiz = function () {
            var httpObj = new HttpService("brainbout");

            var obj = $cookieStore.get('compinfo');
            var userObj = $cookieStore.get('userinfo');

            var data = {
                email: userObj.email,
                competitionSeq: obj.competitionSeq
            }
            httpObj.post("start", data).then(function (response) {
                if (response.status === 'success') {
                    $state.transitionTo('question1');
                } else {
                    alert('Something went wrong');
                }
            });
        };
    }

})();
