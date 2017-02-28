/**
 * Factory for store api url
 */
(function () {
    'use strict';
    angular
        .module('factory.urlRequest', [])
        .factory('url', [
            function () {

                var baseUrl = 'http://127.0.0.1/api/v1/';
                return {

                    user: {
                        login:         baseUrl + 'user/login',
                        signup:        baseUrl + 'user/sign-up',
                        info:          baseUrl + 'user/info',
                        update:        baseUrl + 'user/update'
                    }
                };
            }
        ]);
})();
