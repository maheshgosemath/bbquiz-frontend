(function () {

    'use strict';

    angular.module('app.leaderboard', ['ngCookies'])
        .directive('tmplLeaderboard', directiveFunction)
        .controller('LeaderboardController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {


        var directive = {
            restrict: 'E',
            templateUrl: 'components/leaderboard/leaderboard.html',
            scope: {},
            controller: 'LeaderboardController',
            controllerAs: 'vm'
        };

        return directive;
    }

    ControllerFunction.$inject = ['$state','$rootScope', 'HttpService', '$cookieStore'];

    /* @ngInject */
    function ControllerFunction($state, $rootScope, HttpService, $cookies) {
        var vm = this;
        $rootScope.quizTimer = 1;

        var compObj = $cookies.get('compinfo');
        var data = {
            companySeq: compObj.companySeq,
            competitionSeq: compObj.competitionSeq
        };
        var httpObj = new HttpService("brainbout");
        httpObj.get("competitionleaderboard", data).then(function(response){
            vm.leaderboard = response.leaderboard
        });

        var userObj = $cookies.get('userinfo');
        var data = {
            userId: userObj.email,
            companySeq: compObj.companySeq,
            competitionSeq: compObj.competitionSeq
        };
        httpObj.get("competitionleaderboardlocation", data).then(function(response){
            vm.locationleaderboard = response.leaderboard
        });
    }
})();
