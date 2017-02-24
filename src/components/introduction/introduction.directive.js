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
    ControllerFunction.$inject = ['$state'];

    /* @ngInject */
    function ControllerFunction($state) {

        var vm = this;
        vm.startQuiz = function(){
            $state.transitionTo('question1');
        };
    }

})();
