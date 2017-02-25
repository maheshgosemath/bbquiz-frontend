(function () {

    'use strict';

    angular.module('app.introduction')
        .directive('tmplIntroduction', directiveFunction)
        .controller('IntroductionController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/introduction/introduction.html',
            scope: {
            },
            controller: 'IntroductionController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state', 'HttpService', 'userService', 'compService'];

    /* @ngInject */
    function ControllerFunction($state, HttpService, UserService, CompService) {

        var vm = this;
        vm.startQuiz = function(){
            var httpObj = new HttpService("brainbout");

            var obj = CompService.getComp();
            var data = {
                email: UserService.getUsername(),
                competitionSeq: obj.competitionSeq
            }
            httpObj.post("start", data).then(function(response) {
                if(response === 'success') {
                    $state.transitionTo('question1');
                } else {
                    alert('Something went wrong');
                }
            });
        };
    }

})();
