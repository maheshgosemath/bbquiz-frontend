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

        var httpObj = new HttpService("brainbout");
        var companySeq, competitionSeq, competitionStatus, timeLimit;

        var data =  {
            "ref": "abcdefgh"
        }
        httpObj.get("login", data).then(function(response) {
            companySeq = response.companySeq;
            competitionSeq = response.competitionSeq;
            competitionStatus = response.competitionStatus;
            timeLimit = response.timeLimit;
        });

        function handleSubmit() {
            $state.transitionTo("introduction");

            var data = {
                name: vm.title,
                email: vm.email,
                companySeq: companySeq,
                competitionSeq: competitionSeq
            }

            httpObj.post("register", data).then(function(jsonResp){

            });
        }
    }
})();
