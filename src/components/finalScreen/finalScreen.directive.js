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
        var quizList;
        vm.optionList;

        var obj = $cookieStore.get('submissionResult');
        var userObj = $cookieStore.get('userinfo');
        var compObj = $cookieStore.get('compinfo');
        if(!userObj) {
            $state.transitionTo("home");
        }

        vm.name = userObj.name;
        if(obj && typeof obj.score != 'undefined') {
            vm.score = obj.score;
            vm.url= 'http://brainbout.theuniquemedia.in/brainbout/app?token=' + obj.token;
            paintResponse();
        } else {
            var data = {
                email: userObj.email,
                competitionSeq: compObj.competitionSeq
            }
            var httpObj = new HttpService("brainbout");
            httpObj.get("userstats", data).then(function(response) {
                vm.score = response.score;
                vm.url= 'http://brainbout.theuniquemedia.in/brainbout/app?token=' + response.token;
                vm.optionList = response.quizOptionVOList;
                if(vm.optionList) {
                    paintResponse();
                }
            });
        }

        if(obj && obj.quizOptionVOList) {
            vm.optionList = obj.quizOptionVOList;
        }

        vm.newQuiz = function(){
            $state.transitionTo('home');
        };

        vm.fbpost = function() {
            var url="https://facebook.com/sharer.php?p[url]=" + encodeURIComponent(vm.url);
            window.open(url, "newWindow", "status = 1, height = 500, width = 500, resizable = 0");
        }

        function paintResponse() {
            var quizSeqList = $cookieStore.get('quizList');
            if(quizSeqList) {
                var data1 = {
                    quizSeqList: quizSeqList
                }
                var httpObj = new HttpService("brainbout");
                httpObj.post("quizlist", data1).then(function (response) {
                    quizList = response.quizVOList;
                    if (quizList) {
                        for (var i = 0; i < quizList.length && i < vm.optionList.length; i++) {
                            vm.optionList[i].quizTitle = quizList[i].quizTitle;
                        }
                    }
                });
            }
        }
    }
})();
