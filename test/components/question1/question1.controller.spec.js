/* jshint -W117 */
describe('Question1', function() {
    'use strict';

    var controller;

    beforeEach(function() {
        bard.appModule('app.question1');
        bard.inject('$rootScope', '$controller');
    });

    beforeEach(function() {
        controller = $controller('Question1Controller');
        $rootScope.$apply();
    });

    describe('Question1 controller', function() {
        it('dummy test', function() {
        });
    });
});
