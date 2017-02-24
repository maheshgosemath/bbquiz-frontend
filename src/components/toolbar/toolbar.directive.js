(function () {
    'use strict';

    angular
        .module('app.toolbar')
        .directive('tmplToolbar', directiveFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/toolbar/toolbar.html',
            scope: {
            },
            controller: 'ToolbarController',
            controllerAs: 'vm'
        };

        return directive;
    }


})();
