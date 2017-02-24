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
            scope: {
            },
            controller: 'Question1Controller',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$state'];

    /* @ngInject */
    function ControllerFunction($state) {
        var vm = this;
        vm.optionLabels = ["A", "B", "C", "D", "E","F"];
        vm.toppings = [
            { name: 'Deesa and Kheda', wanted: false },
            { name: 'Junagadh', wanted: false },
            { name: 'Rajkot', wanted: false },
            { name: 'Surat', wanted: false }
        ];

    }

})();
