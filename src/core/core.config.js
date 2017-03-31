(function () {
    'use strict';

    var core = angular.module('app.core');

    // Application configuration values
    var config = {
        appErrorPrefix: '[Angular Template Error] '
    };

    core.value('config', config);

    // Configure the app
    core.config(configFunction);

    configFunction.$inject = [
        '$compileProvider',
        '$logProvider',
        '$mdIconProvider',
        '$mdThemingProvider',
        'exceptionHandlerProvider'
    ];

    /* @ngInject */
    function configFunction(
        $compileProvider,
        $logProvider,
        $mdIconProvider,
        $mdThemingProvider,
        exceptionHandlerProvider) {

        // During development, you may want to set debugInfoEnabled to true. This is required for tools like
        // Protractor, Batarang and ng-inspector to work correctly. However do not check in this change.
        // This flag must be set to false in production for a significant performance boost.
        $compileProvider.debugInfoEnabled(false);

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        exceptionHandlerProvider.configure(config.appErrorPrefix);

        $mdIconProvider
            .iconSet('content', 'images/content-icons.svg', 24)
            .iconSet('navigation', 'images/navigation-icons.svg', 24);

        $mdThemingProvider.definePalette('app-blue', $mdThemingProvider.extendPalette('blue', {
            '50': '#efefef',
            '100': '#cccccc',
            '200': '#bababa',
            '300': '#999999',
            '400': '#7b7b7b',
            '500': '#4c4c4c',
            '600': '#333333',
            '700': '#202020',
            '800': '#0f0f0f',
            '900': '#010101',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 A100',
            'contrastStrongLightColors': '300 400 A200 A400'
        }));

        $mdThemingProvider.definePalette('app-red', $mdThemingProvider.extendPalette('red', {
            'A100': '#DE3641'
        }));

        $mdThemingProvider.theme('default')
            .primaryPalette('app-blue')
            .accentPalette('app-red');
    }
})();
