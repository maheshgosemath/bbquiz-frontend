(function () {

    'use strict';

    angular.module('app.home')
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
    ControllerFunction.$inject = ['$state', 'HttpService', 'quizListService', 'compService', 'userService'];

    /* @ngInject */
    function ControllerFunction($state, HttpService, QuizListService, CompService, UserService) {

        var vm = this;
        vm.handleSubmit = handleSubmit;
        $state.username='';

        var httpObj = new HttpService("brainbout");

        httpObj.get("login", {ref:"abcdefgh"}).then(function(response) {
            var obj = new Object();
            obj.companySeq = response.companySeq;
            obj.competitionSeq = response.competitionSeq;
            CompService.addComp(obj);
        });

        function handleSubmit() {
            var obj = CompService.getComp();
            var data = {
                name: vm.title,
                email: vm.email,
                companySeq: obj.companySeq,
                competitionSeq: obj.competitionSeq
            };

            httpObj.post("register", data).then(function(jsonResp){
                if(jsonResp.timeLeft > 0) {
                    if(jsonResp.quizVOList.length > 0) {
                        QuizListService.addList(jsonResp.quizVOList);
                        $state.transitionTo("introduction");
                    } else {
                        alert('No questions found');
                    }
                } else {
                    alert('Your quiz time is over');
                }
            });
        }
    }
})();
