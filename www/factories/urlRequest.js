/**
 * Factory for store api url
 */
(function () {
    'use strict';
    angular
        .module('factory.urlRequest', [])
        .factory('url', [
            function () {

                var baseUrl = 'http://85.143.223.54:4000/api/v1/';

                return {
                    site: {
                        login:  baseUrl + 'site/login',
                        signup: baseUrl + 'site/signup'
                    }
                };
            }
        ]);
})();
