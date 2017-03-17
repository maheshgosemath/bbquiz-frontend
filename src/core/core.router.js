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

            .state('error', {
                url: '/error',
                template: '<tmpl-error></tmpl-error>'
            })

            .state('introduction', {
                url: '/introduction',
                template: '<tmpl-introduction></tmpl-introduction>'
            })

            .state('question1', {
                url: '/question1',
                template: '<tmpl-question1></tmpl-question1>'
            })

            .state('register', {
                url: '/register',
                template: '<tmpl-register></tmpl-register>'
            })
            .state('finalScreen', {
                url: '/finalScreen',
                template: '<tmpl-final-screen></tmpl-final-screen>'
            })
            .state('dashboard', {
                url: '/dashboard',
                template: '<tmpl-dashboard></tmpl-dashboard>'
            }).
            state('leaderboard', {
                url: '/leaderboard',
                template: '<tmpl-leaderboard></tmpl-leaderboard>'
            }).
            state('verify', {
                url: '/verify/:token',
                template: '<tmpl-verify></tmpl-verify>'
            });

    }
})();
