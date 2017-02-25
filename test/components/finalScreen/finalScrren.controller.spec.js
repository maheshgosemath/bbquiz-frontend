/* jshint -W117 */
describe('FinalScreen', function() {
    'use strict';

    var controller;

    beforeEach(function() {
        bard.appModule('app.finalScreen');
        bard.inject('$rootScope', '$controller');
    });

    beforeEach(function() {
        controller = $controller('FinalScreenController');
        $rootScope.$apply();
    });

    describe('FinalScreen controller', function() {
        it('dummy test', function() {
        });
    });
});
