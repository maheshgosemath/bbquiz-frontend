(function() {

    'use strict';

    angular.module('app.toolbar')
        .controller('ToolbarController', ControllerFunction);


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$mdDialog','$cookieStore'];

    /* @ngInject */
    function ControllerFunction($mdDialog, $cookieStore) {

        var vm = this;

        var userObj = $cookieStore.get('userinfo');
        vm.username = userObj.name;

    }

})();
