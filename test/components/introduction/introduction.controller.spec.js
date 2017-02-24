/* jshint -W117 */
describe('Introduction', function() {
    'use strict';

    var controller;

    beforeEach(function() {
        bard.appModule('app.introduction');
        bard.inject('$rootScope', '$controller');
    });

    beforeEach(function() {
        controller = $controller('IntroductionController');
        $rootScope.$apply();
    });

    describe('Introduction controller', function() {
        it('dummy test', function() {
        });
    });
});
