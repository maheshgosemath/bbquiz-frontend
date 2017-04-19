(function () {

    'use strict';

    angular.module('app.question1', ['ngCookies'])
        .directive('tmplQuestion1', directiveFunction)
        .directive('demoQuestion1', demoDirectiveFunction)
        .controller('Question1Controller', ControllerFunction)
        .controller('DemoQuestion1Controller', DemoControllerFunction)


    // ----- directiveFunction -----
    directiveFunction.$inject = [];
    demoDirectiveFunction.$inject = [];

    /* @ngInject */
    function demoDirectiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/question1/demo-question1.html',
            scope: {},
            controller: 'DemoQuestion1Controller',
            controllerAs: 'vm'
        };

        return directive;
    }

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
    ControllerFunction.$inject = ['$state', 'HttpService', '$cookieStore', '$rootScope', '$scope'];
    DemoControllerFunction.$inject = ['$state', '$cookieStore', '$filter'];

    function DemoControllerFunction($state, $cookieStore, $filter) {
        var vm = this;

        var quizList = [
            {
                genre: "G.K.",
                quizImg: "",
                quizSeq: 3,
                quizTitle: "Number of questions to participate in Edelwiess Brain Bout Quiz?",
                optionList: [
                    {
                        isCorrect: "",
                        optionSeq: 517,
                        optionTitle: "20"
                    },
                    {
                        isCorrect: "",
                        optionSeq: 518,
                        optionTitle: "30"
                    },
                    {
                        isCorrect: "",
                        optionSeq: 519,
                        optionTitle: "42"
                    },
                    {
                        isCorrect: "Y",
                        optionSeq: 520,
                        optionTitle: "32"
                    }
                ]
            },
            {
                genre: "G.K.",
                quizImg: "",
                quizSeq: 4,
                quizTitle: "Which of the following is true",
                optionList: [
                    {
                        isCorrect: "",
                        optionSeq: 653,
                        optionTitle: "Can skip any question"

                    },
                    {
                        isCorrect: "",
                        optionSeq: 654,
                        optionTitle: "Can save quiz"

                    },
                    {
                        isCorrect: "",
                        optionSeq: 655,
                        optionTitle: "Can go back and change the answer"

                    },
                    {
                        isCorrect: "Y",
                        optionSeq: 656,
                        optionTitle: "None of the above"

                    }
                ]
            },
            {
                genre: "G.K.",
                quizImg: "",
                quizSeq: 5,
                quizTitle: "What is the time limit to submit the quiz?",
                optionList: [
                    {
                        isCorrect: "",
                        optionSeq: 569,
                        optionTitle: "30 minutes"
                    },
                    {
                        isCorrect: "",
                        optionSeq: 570,
                        optionTitle: "40 minutes"
                    },
                    {
                        isCorrect: "Y",
                        optionSeq: 571,
                        optionTitle: "10 minutes"
                    },
                    {
                        isCorrect: "",
                        optionSeq: 572,
                        optionTitle: "No time limit"
                    }
                ]

            },
            {
                genre: "G.K.",
                quizImg: "",
                quizSeq: 6,
                quizTitle: "What is the winning criteria",
                optionList: [
                    {
                        isCorrect: "",
                        optionSeq: 597,
                        optionTitle: "Maximum correct answer"
                    },
                    {
                        isCorrect: "",
                        optionSeq: 598,
                        optionTitle: "Minimum time taken"
                    },
                    {
                        isCorrect: "Y",
                        optionSeq: 599,
                        optionTitle: "Maximum correct answer in minimum time"
                    },
                    {
                        isCorrect: "",
                        optionSeq: 600,
                        optionTitle: "None of the above"
                    }
                ]
            },
            {
                genre: "Entertainment",
                quizImg: "",
                quizSeq: 43,
                quizTitle: "What will happen if I logout during the quiz?",
                optionList: [
                    {
                        isCorrect: "",
                        optionSeq: 261,
                        optionTitle: "My answers will be auto-submitted"
                    },
                    {
                        isCorrect: "",
                        optionSeq: 262,
                        optionTitle: "Can come back continue from where I left "
                    },
                    {
                        isCorrect: "Y",
                        optionSeq: 263,
                        optionTitle: "Start all over again on next login"
                    },
                    {
                        isCorrect: "",
                        optionSeq: 264,
                        optionTitle: "None of the above"
                    }
                ]

            }
        ];


        vm.demoAnswerList = [
            {
                quizSeq: 3,
                quizTitle: "Number of questions to participate in Edelwiess Brain Bout Quiz?",
                isCorrect: ""
            },
            {
                quizSeq: 4,
                quizTitle: "Which of the following is true",
                isCorrect: ""
            },
            {
                quizSeq: 5,
                quizTitle: "What is the time limit to submit the quiz?",
                isCorrect: ""
            },
            {
                quizSeq: 6,
                quizTitle: "What is the winning criteria",
                isCorrect: ""
            },
            {
                quizSeq: 43,
                quizTitle: "What will happen if I logout during the quiz?",
                isCorrect: ""
            }
        ];
        var pointer = 0;
        var demoScore = 0;
        vm.buttonLabel = "NEXT";
        vm.optionSeq = '';
        paintQuestion(vm, quizList, pointer);
        pointer = pointer + 1;
        vm.length = quizList.length;
        function paintQuestion(vm, quizList, pointer) {
            vm.index = pointer + 1;
            vm.question = quizList[pointer].quizTitle;
            var optionList = quizList[pointer].optionList;
            vm.quizSeq = quizList[pointer].quizSeq;
            vm.quizImg = quizList[pointer].quizImg;

            var tempList = new Array();
            vm.optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
            angular.forEach(optionList, function (option, index) {
                var obj = {};
                obj.name = option.optionTitle;
                obj.seq = option.optionSeq;
                obj.wanted = false;
                tempList[index] = obj;
            });
            vm.options = tempList;
            if ((pointer + 1) === quizList.length) {
                vm.buttonLabel = "Submit"
            }
        }

        vm.nextQuiz = function () {
            if (vm.optionSeq != '') {
                if (pointer < quizList.length) {
                    store(vm.quizSeq, vm.optionSeq);
                    vm.optionSeq = '';
                    paintQuestion(vm, quizList, pointer);
                    pointer = pointer + 1;
                } else {
                    store(vm.quizSeq, vm.optionSeq);
                    submitQuiz();
                }
            }
        };

        function submitQuiz() {
            $state.transitionTo('finalScreenDemo');
        }

        var demoOptionArr = [];

        function store(quizSeq, optionSeq) {
            var tempObj = $filter('filter')(quizList, {quizSeq: quizSeq});
            var tempAnswerObj = $filter('filter')(vm.demoAnswerList, {quizSeq: quizSeq});
            var currentQuestionObj = tempObj[0];
            var currentAnswerObj = tempAnswerObj[0];
            for (var i = 0; i <= currentQuestionObj.optionList.length; i++) {
                var tempOption = $filter('filter')(currentQuestionObj.optionList, {optionSeq: optionSeq});
                var optionSelectedObj = tempOption[0];
                if (optionSelectedObj.isCorrect == "Y") {
                    demoScore++;
                    currentAnswerObj.isCorrect = "Y";
                } else {
                    currentAnswerObj.isCorrect = "N";
                }
            }

            demoOptionArr.push(currentAnswerObj);
            $cookieStore.put('demoScore', demoScore);
            $cookieStore.put('demoOptionList', demoOptionArr);
        }
    }

    /* @ngInject */
    function ControllerFunction($state, HttpService, $cookieStore, $rootScope, $scope) {
        var vm = this;
        vm.fileType = function (value) {
            if (value.indexOf('.mp3') > -1) {
                return "A";
            } else {
                return "I"
            }

        };
        vm.index = 1;
        vm.buttonLabel = "NEXT";
        var pointer = 0;
        var answerList = new Array();
        vm.optionSeq = '';
        var compInterval;
        $rootScope.quizTimer = 0;

        var userObj = $cookieStore.get('userinfo');
        var compObj = $cookieStore.get('compinfo');

        if (!userObj) {
            $state.transitionTo('home');
        }

        var quizList;

        if (userObj && compObj) {
            init();
            var data = {
                email: userObj.email,
                companySeq: compObj.companySeq,
                competitionSeq: compObj.competitionSeq,
                quizSeqList: $cookieStore.get('quizList')
            };
            var httpObj = new HttpService("brainbout");
            httpObj.post("quizlist", data).then(function (response) {
                quizList = response.quizVOList;
                saveQuizSeqList();
                vm.length = quizList.length;
                paintQuestion(vm, quizList, pointer);
                pointer = pointer + 1;
                compInterval = setTimeout(submitQuiz, (response.timeLeft * 1000));
                $rootScope.quizTimer = response.timeLeft;
            });
        }

        vm.nextQuiz = function () {
            if (vm.optionSeq != '') {
                if (pointer < quizList.length) {
                    store(vm.quizSeq, vm.optionSeq);
                    vm.optionSeq = '';
                    paintQuestion(vm, quizList, pointer);
                    pointer = pointer + 1;
                } else {
                    store(vm.quizSeq, vm.optionSeq);
                    submitQuiz();
                }
            }
        }

        function store(quizSeq, optionSeq) {
            var answer = new Object();
            answer.quizSeq = quizSeq;
            answer.optionSeq = optionSeq;
            answerList.push(answer);
            $cookieStore.put('pointer', pointer);
            $cookieStore.put('useranswer', answerList);
        }

        function saveQuizSeqList() {
            var quizSeqList = new Array();
            for (var i = 0; i < quizList.length; i++) {
                quizSeqList.push(quizList[i].quizSeq);
            }
            $cookieStore.put('quizList', quizSeqList);
        }

        function submitQuiz() {
            clearTimeout(compInterval);
            var data = {
                quizOptionVOList: answerList,
                email: userObj.email,
                competitionSeq: compObj.competitionSeq
            }
            var httpObj = new HttpService("brainbout");
            httpObj.post("submit", data).then(function (jsonResp) {
                $rootScope.timerStatus = 'stop';
                $cookieStore.put("submissionResult", jsonResp);
                $state.transitionTo('finalScreen');
                $rootScope.quizTimer = 1;
            });
        }

        function init() {
            pointer = $cookieStore.get('pointer');
            if (!pointer) {
                pointer = 0;
            }
            answerList = $cookieStore.get('useranswer');
            if (!answerList) {
                answerList = new Array();
            }
        }

        $scope.$on('$destroy', function () {
            clearTimeout(compInterval);
        });

    }

    function paintQuestion(vm, quizList, pointer) {
        vm.index = pointer + 1;
        vm.question = quizList[pointer].quizTitle;
        var optionList = quizList[pointer].optionList;
        vm.quizSeq = quizList[pointer].quizSeq;
        vm.quizImg = quizList[pointer].quizImg;

        var tempList = new Array();
        vm.optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
        angular.forEach(optionList, function (option, index) {
            var obj = {};
            obj.name = option.optionTitle
            obj.seq = option.optionSeq
            obj.wanted = false;
            tempList[index] = obj;
        });
        vm.options = tempList;
        if ((pointer + 1) === quizList.length) {
            vm.buttonLabel = "Submit"
        }
    }


})();
