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
                        files:   baseUrl + 'files',
                        login:   baseUrl + 'site/login',
                        signup:  baseUrl + 'site/signup',
                    },
                    users: {
                        me:      baseUrl + 'users/me',
                        update:  baseUrl + 'users/'
                    },
                    categories: {
                        all:     baseUrl + 'categories',
                        one:     baseUrl + 'categories/'
                    },
                    offers: {
                        all:     baseUrl + 'offers',
                        add:     baseUrl + 'offers'
                    },
                    comments: {
                        get:     baseUrl + 'comments/'
                    }
                };
            }
        ]);
})();
