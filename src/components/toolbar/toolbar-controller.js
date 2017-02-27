(function() {

    'use strict';

    angular.module('app.toolbar')
        .controller('ToolbarController', ControllerFunction);


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$mdDialog','$cookieStore', 'userService', '$scope'];

    /* @ngInject */
    function ControllerFunction($mdDialog, $cookieStore, userService, $scope) {

        var vm = this;

        var userObj = $cookieStore.get('userinfo');
        if (userObj) {
            vm.username = userObj.name;
        }
        $scope.$watch('username', function () {
            vm.username = userService.getUsername();
        })
    }

})();
