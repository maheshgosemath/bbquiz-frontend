(function () {

        'use strict';

        angular.module('app.question1')
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
    ControllerFunction.$inject = ['$state'];

    /* @ngInject */
    var vm, pointer, quizList;
    function ControllerFunction($state, HttpService) {
        var vm = this;
        vm.length = 10;
        vm.index = 1;
        vm.buttonLabel = "NEXT"
        var pointer = 0;
        var quizList;

        var data = {
            name: 'test',
            email: 'maheshgosemath@gmail.com',
            companySeq: 1,
            competitionSeq: 1
        };

        var httpObj = new HttpService("brainbout");
        httpObj.post("register", data).then(function(jsonResp){
            quizList = jsonResp.quizVOList;
            vm.length = quizList.length;
            paintQuestion(vm,quizList,pointer);
        });

        vm.nextQuiz = function() {
            if(pointer < quizList.length) {
                paintQuestion(vm, quizList, ++pointer);
            } else {
                alert("Submit quiz!!!");
            }
        }

        vm.endQuiz = function() {
            $state.transitionTo('finalScreen');
        }
    }

    function paintQuestion(vm, quizList, pointer) {
        vm.index = pointer + 1;
        vm.question = quizList[pointer].quizTitle;
        var optionList = quizList[0].optionList;

        var tempList=new Array();
        vm.optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
        angular.forEach(optionList, function(option, index) {
            var obj = {};
            obj.name = option.optionTitle
            obj.wanted=false;
            tempList[index] = obj;
        });
        vm.options = tempList;
        if((pointer + 1) === quizList.length) {
            vm.buttonLabel = "Submit"
        }
    }

})();
