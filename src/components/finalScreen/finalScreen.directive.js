(function () {

    'use strict';

    angular.module('app.finalScreen')
        .directive('tmplFinalScreen', directiveFunction)
        .controller('FinalScreenController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {


        var directive = {
            restrict: 'E',
            templateUrl: 'components/finalScreen/finalScreen.html',
            scope: {
            },
            controller: 'FinalScreenController',
            controllerAs: 'vm'
        };

        return directive;
    }

    ControllerFunction.$inject = ['$state'];

    /* @ngInject */
    function ControllerFunction($state) {
        var vm = this;

        vm.toppings = [
            { name: 'From which districts in Gujrat does  McCain source potatoes for McDonalds'},
            { name: 'Which Rajiv Gandhi Khel Ratna awardee would be fit in this set of pictures'},
            { name: 'What is the maximum sugar content in McDolands burger buns in India' },
            { name: 'Ronald Mc Donald has been given what designation since August 2003 by the Mc Donalds Corporation' }
        ];

        var vm = this;
        vm.newQuiz = function(){
            $state.transitionTo('home');
        };

    }

})();
