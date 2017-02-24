/* jshint -W117 */
describe('FinalScreen', function() {
    'use strict';

    var controller;

    beforeEach(function() {
        bard.appModule('app.finalScreen');
        bard.inject('$rootScope', '$controller');
    });

    beforeEach(function() {
        controller = $controller('FinalScrrenController');
        $rootScope.$apply();
    });

    describe('FinalScren controller', function() {
        it('dummy test', function() {
        });
    });
});
