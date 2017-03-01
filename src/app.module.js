(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',

        // Features (listed alphabetically)
        'app.approot',
        'app.home',
        'app.toolbar',
        'app.introduction',
        'app.question1',
        'app.finalScreen',
        'app.error'

    ]).factory('userService', function() {
        var username;
        var addUsername = function(newUsername) {
            username = newUsername;
        }
        var getUsername = function() {
            return username;
        }
        return {
            addUsername: addUsername,
            getUsername: getUsername
        }
    });
})();
