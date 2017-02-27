(function () {

    'use strict';

    angular.module('app.finalScreen', ['ngCookies'])
        .directive('tmplFinalScreen', directiveFunction)
        .controller('FinalScreenController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {


        var directive = {
            restrict: 'E',
            templateUrl: 'components/finalScreen/finalScreen.html',
            scope: {},
            controller: 'FinalScreenController',
            controllerAs: 'vm'
        };

        return directive;
    }

    ControllerFunction.$inject = ['$state', 'HttpService','$cookieStore'];

    /* @ngInject */
    function ControllerFunction($state, HttpService, $cookieStore) {
        var vm = this;

        var obj = $cookieStore.get('submissionResult');
        var userObj = $cookieStore.get('userinfo');
        var compObj = $cookieStore.get('compinfo');
        if(!userObj) {
            $state.transitionTo("home");
        }

        vm.name = userObj.name;
        if(obj && obj.score) {
            vm.score = obj.score;
            vm.url= 'http://brainbout.theuniquemedia.in/brainbout/app?token=' + obj.token;
        } else {
            var data = {
                email: userObj.email,
                competitionSeq: compObj.competitionSeq
            }
            var httpObj = new HttpService("brainbout");
            httpObj.get("userstats", data).then(function(response) {
                vm.score = response.score;
                vm.url= 'http://brainbout.theuniquemedia.in/brainbout/app?token=' + response.token;
            });
        }

        vm.newQuiz = function(){
            $state.transitionTo('home');
        };

        vm.fbpost = function() {
            var url="https://facebook.com/sharer.php?p[url]=" + encodeURIComponent(vm.url);
            window.open(url, "newWindow", "status = 1, height = 500, width = 500, resizable = 0");
        }

        vm.getIsCorrect = function (qSeq) {
            for (var i = 0; i < obj.quizOptionVOList.length; i++) {
                if (obj.quizOptionVOList[i].quizSeq == qSeq) {
                    return obj.quizOptionVOList[i].isCorrect == "Y";
                }
            }
        }
    }
})();
