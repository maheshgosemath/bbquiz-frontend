(function() {
    'use strict';

    angular.module('app.core', [
        'ngAnimate', 'ngMaterial', 'ngSanitize',

        // Our reusable framework
        'fw.exception', 'fw.logger',

        // 3rd Party modules
        'ui.router'
    ])
        .factory('HttpService',['$http', '$q', 'UserInfoService', '$location', function ($http, $q, UserInfoService, $location) {
            var apiRoot = "/";

            var HttpService = function (apiModule) {
                this.apiModule = apiModule;
            };

            function makeRequestSuccess(response) {
                if (response.status == 200) {
                    return response.data;
                } else {
                    return $q.reject(response.data.message);
                }
            }

            function makeRequestFailed(response) {
                if(response.status == 403) {
                    //alert("Login failed or session expired. Please login again.");
                    UserInfoService.deleteUserInfo();
                    $location.path('home');
                    return $q.reject("Error#" + response.status);
                } else {
                    if(response.status == 401) {
                        var errMsg = "Invalid login";
                        return $q.reject("Error#" + response.status + ": " + errMsg);
                    } else {
                        var errMsg = "Some problem in server, try reloading the page. If the issue still persist contact admin.";
                        return $q.reject("Error#" + response.status + ": " + errMsg);
                    }
                }
            }

            HttpService.prototype.get = function (url, data) {
                var self = this;
                return $http.get(apiRoot + self.apiModule + "/" + url, {params:data}).then(makeRequestSuccess, makeRequestFailed);
            };
            HttpService.prototype.post = function (url, params) {
                var self = this;
                return $http.post(apiRoot + self.apiModule + "/" + url, params).then(makeRequestSuccess, makeRequestFailed);
            };
            HttpService.prototype.post = function (url, params, config) {
                var self = this;
                return $http.post(apiRoot + self.apiModule + "/" + url, params, config).then(makeRequestSuccess, makeRequestFailed);
            };
            HttpService.prototype.delete = function (url) {
                var self = this;
                return $http.delete(apiRoot + self.apiModule + "/" + url).then(makeRequestSuccess, makeRequestFailed);
            };
            return HttpService;
        }]);
})();
