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
    ControllerFunction.$inject = ['$state', 'HttpService'];

    /* @ngInject */
    function ControllerFunction($state, HttpService) {

        var vm = this;
        vm.title = "";
        vm.email = "";

        vm.handleSubmit = handleSubmit;


        function handleSubmit() {
            $state.transitionTo("introduction");
        }
        var httpObj = new HttpService("question");
        httpObj.get("/list").then(function(jsonResp){
            console.info(jsonResp);
        })
    }

})();
