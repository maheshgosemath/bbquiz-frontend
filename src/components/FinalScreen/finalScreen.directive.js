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

    function ControllerFunction(){

    }

})();


