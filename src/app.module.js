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

    ]);


    app.service('quizListService', function() {
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
    });
})();
