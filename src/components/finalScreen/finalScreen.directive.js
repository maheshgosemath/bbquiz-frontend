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
            scope: {
            },
            controller: 'FinalScreenController',
            controllerAs: 'vm'
        };

        return directive;
    }

    ControllerFunction.$inject = ['$state', '$cookieStore'];

    /* @ngInject */
    function ControllerFunction($state, $cookieStore) {
        var vm = this;

        var obj = $cookieStore.get('submissionResult');
        var userObj = $cookieStore.get('userinfo');
        vm.score = obj.score;
        vm.name = userObj.name;

        var vm = this;
        vm.newQuiz = function(){
            $state.transitionTo('home');
        };

    }

})();
