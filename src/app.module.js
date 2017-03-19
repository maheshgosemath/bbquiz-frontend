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
        'app.register',
        'app.error',
        'app.dashboard',
        'app.leaderboard',
        'app.verify'

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
    }).factory('errorService',function() {
        var errorMsg, errorHeader;
        var addError = function(newErrorMsg, newErrorHeader) {
            errorMsg = newErrorMsg;
            errorHeader = newErrorHeader;
        }
        var getError = function() {
            return {
                errorMsg: errorMsg,
                errorHeader: errorHeader
            }
        }
        return {
            addError: addError,
            getError: getError
        }
    });
})();
