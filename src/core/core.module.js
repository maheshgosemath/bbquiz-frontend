(function() {
    'use strict';

    angular.module('app.core', [
        'ngAnimate', 'ngMaterial', 'ngSanitize',

        // Our reusable framework
        'fw.exception', 'fw.logger',

        // 3rd Party modules
        'ui.router'
    ])
        .factory('HttpService',['$http', '$q', function ($http, $q) {
            var apiRoot = "../rest/";

            var HttpService = function (apiModule) {
                this.apiModule = apiModule;
            };

            function makeRequestSuccess(response) {
                if (response.data.status == 200) {
                    return response.data;
                } else {
                    return $q.reject(response.data.message);
                }
            }

            function makeRequestFailed(response) {
                var errMsg = "Some problem in server, try reloading the page. If the issue still persist contact admin.";
                return $q.reject("Error#" + response.status + ": " + errMsg);
            }

            HttpService.prototype.get = function (url) {
                var self = this;
                return $http.get(apiRoot + self.apiModule + "/" + url).then(makeRequestSuccess, makeRequestFailed);
            };
            HttpService.prototype.post = function (url, params) {
                var self = this;
                return $http.post(apiRoot + self.apiModule + "/" + url, params).then(makeRequestSuccess, makeRequestFailed);
            };
            HttpService.prototype.delete = function (url) {
                var self = this;
                return $http.delete(apiRoot + self.apiModule + "/" + url).then(makeRequestSuccess, makeRequestFailed);
            };
            return HttpService;
        }]);
})();
