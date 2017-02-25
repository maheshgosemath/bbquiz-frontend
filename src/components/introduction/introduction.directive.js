(function () {

    'use strict';

    angular.module('app.introduction', ['ngCookies'])
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
    ControllerFunction.$inject = ['$state', 'HttpService', '$cookieStore'];

    /* @ngInject */
    function ControllerFunction($state, HttpService, $cookieStore) {

        var vm = this;
        vm.startQuiz = function(){
            var httpObj = new HttpService("brainbout");

            var obj = $cookieStore.get('compinfo');
            var userObj = $cookieStore.get('userinfo');
            var data = {
                email: userObj.email,
                competitionSeq: obj.competitionSeq
            }
            httpObj.post("start", data).then(function(response) {
                if(response.status === 'success') {
                    $state.transitionTo('question1');
                } else {
                    alert('Something went wrong');
                }
            });
        };
    }

})();
