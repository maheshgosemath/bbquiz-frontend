(function () {

        'use strict';

        angular.module('app.question1', ['ngCookies'])
            .directive('tmplQuestion1', directiveFunction)
            .controller('Question1Controller', ControllerFunction);


        // ----- directiveFunction -----
        directiveFunction.$inject = [];

        /* @ngInject */
        function directiveFunction() {

            var directive = {
                restrict: 'E',
                templateUrl: 'components/question1/question1.html',
                scope: {},
                controller: 'Question1Controller',
                controllerAs: 'vm'
            };

            return directive;
        }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state', 'HttpService', '$cookieStore'];

    /* @ngInject */
    var vm, pointer, quizList;
    function ControllerFunction($state, HttpService, $cookieStore) {
        var vm = this;
        vm.index = 1;
        vm.buttonLabel = "NEXT"
        var pointer = 0;
        var answerList = new Array();
        vm.optionSeq = '';

        var userObj = $cookieStore.get('userinfo');
        var compObj = $cookieStore.get('compinfo');
        if(!userObj) {
            $state.transitionTo("home");
        }
        var quizList;
        init();

        var data = {
            email: userObj.email,
            companySeq: compObj.companySeq,
            competitionSeq: compObj.competitionSeq,
            quizSeqList: $cookieStore.get('quizList')
        };
        var httpObj = new HttpService("brainbout");
        httpObj.post("quizlist", data).then(function(response) {
            quizList = response.quizVOList;
            saveQuizSeqList();
            vm.length = quizList.length;
            paintQuestion(vm,quizList,pointer);
            pointer = pointer + 1;
        });

        vm.nextQuiz = function() {
            if(vm.optionSeq != '') {
                if (pointer < quizList.length) {
                    store(vm.quizSeq, vm.optionSeq);
                    vm.optionSeq = '';
                    paintQuestion(vm, quizList, pointer);
                    pointer = pointer + 1;
                } else {
                    submitQuiz();
                }
            }
        }

        function store(quizSeq, optionSeq) {
            var answer = new Object();
            answer.quizSeq=quizSeq;
            answer.optionSeq=optionSeq;
            answerList.push(answer);
            $cookieStore.put('pointer', pointer);
            $cookieStore.put('useranswer', answerList);
        }

        function saveQuizSeqList() {
            var quizSeqList = new Array();
            for(var i=0;i<quizList.length;i++) {
                quizSeqList[i]=quizList[0].quizSeq;
            }
            $cookieStore.put('quizList', quizSeqList);
        }

        function submitQuiz() {
            var data = {
                quizOptionVOList: answerList,
                email: userObj.email,
                competitionSeq: compObj.competitionSeq
            }
            var httpObj = new HttpService("brainbout");
            httpObj.post("submit", data).then(function(jsonResp){
                $cookieStore.put("submissionResult", jsonResp);
                $state.transitionTo('finalScreen');
            });
        }

        function init() {
            pointer = $cookieStore.get('pointer');
            if(!pointer) {
                pointer = 0;
            }
            answerList = $cookieStore.get('useranswer');
            if(!answerList) {
                answerList = new Array();
            }
        }
    }

    function paintQuestion(vm, quizList, pointer) {
        vm.index = pointer + 1;
        vm.question = quizList[pointer].quizTitle;
        var optionList = quizList[pointer].optionList;
        vm.quizSeq = quizList[pointer].quizSeq;

        var tempList=new Array();
        vm.optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
        angular.forEach(optionList, function(option, index) {
            var obj = {};
            obj.name = option.optionTitle
            obj.seq = option.optionSeq
            obj.wanted=false;
            tempList[index] = obj;
        });
        vm.options = tempList;
        if((pointer + 1) === quizList.length) {
            vm.buttonLabel = "Submit"
        }
    }

})();
