
(function () {

    'use strict';

    angular.module('app.dashboard', ['ngCookies'])
        .directive('tmplDashboard', directiveFunction)
        .controller('DashboardController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {


        var directive = {
            restrict: 'E',
            templateUrl: 'components/dashboard/dashboard.html',
            scope: {},
            controller: 'DashboardController',
            controllerAs: 'vm'
        };

        return directive;
    }

    ControllerFunction.$inject = ['$state','HttpService', '$cookieStore', '$rootScope'];

    /* @ngInject */
    function ControllerFunction($state, HttpService, $cookies, $rootScope) {
        var vm = this;
        vm.loaded = false;
        clearCookies();

        //$state.reload();
        vm.Math = window.Math;
        $rootScope.timerStatus = 'stop';
        $rootScope.quizTimer = 1;

        var compObj = $cookies.get('compinfo');
        var userObj = $cookies.get('userinfo');

        if(!userObj) {
            $state.transitionTo('home');
        }

        if(userObj && compObj) {
            if(compObj.competitionSeq) {
                compObj.competitionSeq = '';
                $cookies.put('compinfo', compObj);
            }
            var data = {
                companySeq: compObj.companySeq,
                email: userObj.email
            };

            var httpObj = new HttpService("brainbout");
            httpObj.post("dashboard", data).then(function (response) {
                vm.competitionList = response.dashboard;
                vm.currentCompetition_length = vm.competitionList.currentCompetitionList.length;
                vm.upComingCompetition_length = vm.competitionList.upcomingCompetitionList.length;
                vm.pastCompetition_length = vm.competitionList.pastCompetitionList.length;
            });

            data = {
                companySeq: compObj.companySeq
            }
            httpObj.get("companyleaderboard", data).then(function (response) {
                vm.leaderboard = response.leaderboard
                vm.loaded = true;
            });
        }

        vm.show_score = function(competitionSeq) {
            addCompetitionDetails(competitionSeq);
            $state.transitionTo('finalScreen');
        }

        vm.enter_quiz = function(competitionSeq, userStatus) {
            addCompetitionDetails(competitionSeq);
            if(userStatus === 'NP') {
                $state.transitionTo('introduction');
            } else {
                $state.transitionTo('question1');
            }
        }

        vm.show_leaderboard = function(competitionSeq) {
            addCompetitionDetails(competitionSeq);
            $state.transitionTo('leaderboard');
        }

        function addCompetitionDetails(competitionSeq) {
            var compObj = $cookies.get('compinfo');
            compObj.competitionSeq = competitionSeq;
            $cookies.put('compinfo', compObj);
        }

        function clearCookies() {
            $cookies.remove('pointer');
            $cookies.remove('submissionResult');
            $cookies.remove('useranswer');
            $cookies.remove('quizList');
        }
    }
})();
