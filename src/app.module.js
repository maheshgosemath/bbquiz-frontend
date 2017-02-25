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
        'app.finalScreen'

    ]).factory('quizListService', function() {
        var myList = [];
        var addList = function (newObj) {
            myList.push(newObj);
        }
        var getList = function () {
            return myList;
        }
        return {
            addList: addList,
            getList: getList
        }
    }).factory("compService", function() {
        var userObj;
        var addCompetition = function (newObj) {
            userObj = newObj;
        };
        var getCompetition = function () {
            return userObj;
        };
        return {
            addComp: addCompetition,
            getComp: getCompetition
        }
    }).factory('userService', function() {
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
