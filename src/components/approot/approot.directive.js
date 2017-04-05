(function () {

    'use strict';

    angular.module('app.approot', ['ngCookies'])
        .directive('tmplApproot', directiveFunction);


    directiveFunction.$inject = ['$state', '$rootScope', '$location', '$cookieStore'];
    // ----- directiveFunction -----
    function directiveFunction($state, $rootScope, $location, $cookieStore) {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/approot/approot.html',
            scope: {
            }
        };

        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            var userObj = $cookieStore.get('userinfo')
            if (toState.module === 'private' && !userObj) {
                $location.path('home');
            }
            if(toState.module === 'public' && userObj) {
                $location.path('dashboard');
            }
            return;
        });

        return directive;
    }

})();
