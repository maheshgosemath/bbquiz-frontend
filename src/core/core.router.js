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
                template: '<tmpl-home></tmpl-home>',
                module: 'public'
            })

            .state('error', {
                url: '/error',
                template: '<tmpl-error></tmpl-error>',
                module: 'public'
            })

            .state('introduction', {
                url: '/introduction',
                template: '<tmpl-introduction></tmpl-introduction>',
                module: 'private'
            })

            .state('introductionDemo', {
                url: '/introductionDemo',
                template: '<demo-introduction></demo-introduction>',
                module: 'private'
            })

            .state('question1', {
                url: '/question1',
                template: '<tmpl-question1></tmpl-question1>',
                module: 'private'
            })
            .state('question1Demo', {
                url: '/question1Demo',
                template: '<demo-question1></demo-question1>',
                module: 'private'
            })

            .state('register', {
                url: '/register',
                template: '<tmpl-register></tmpl-register>',
                module: 'public'
            })

            .state('finalScreen', {
                url: '/finalScreen',
                template: '<tmpl-final-screen></tmpl-final-screen>',
                module: 'private'
            })
            .state('finalScreenDemo', {
                url: '/finalScreenDemo',
                template: '<demo-final-screen></demo-final-screen>',
                module: 'private'
            })

            .state('dashboard', {
                url: '/dashboard',
                template: '<tmpl-dashboard></tmpl-dashboard>',
                module: 'private'
            })

            .state('leaderboard', {
                url: '/leaderboard',
                template: '<tmpl-leaderboard></tmpl-leaderboard>',
                module: 'private'
            })

            .state('verify', {
                url: '/verify/:token',
                template: '<tmpl-verify></tmpl-verify>',
                module: 'public'
            });
    }
})();
