(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(configFunction);

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                template: '<tmpl-home></tmpl-home>'
            })

            .state('introduction', {
                url: '/introduction',
                template: '<tmpl-introduction></tmpl-introduction>'
            })

           .state('question1', {
            url: '/question1',
            template: '<tmpl-question1></tmpl-question1>'
        });


    }
})();
