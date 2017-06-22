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
                        files:          baseUrl + 'files',
                        login:          baseUrl + 'site/login',
                        signup:         baseUrl + 'site/signup',
                        count:          baseUrl + 'site/count'
                    },
                    users: {
                        me:             baseUrl + 'users/me',
                        one:            baseUrl + 'users/',
                        update:         baseUrl + 'users/',
                        favourites:     baseUrl + 'users/favourites',
                        my_offers:      baseUrl + 'users/my_offers'
                    },
                    news: {
                        all:            baseUrl + 'news',
                        one:            baseUrl + 'news/'
                    },
                    categories: {
                        all:            baseUrl + 'categories',
                        one:            baseUrl + 'categories/'
                    },
                    offers: {
                        all:            baseUrl + 'offers',
                        add:            baseUrl + 'offers',
                        one:            baseUrl + 'offers/'
                    },
                    services: {
                        all:            baseUrl + 'services',
                        add:            baseUrl + 'services',
                        one:            baseUrl + 'services/'
                    },
                    suggestion: {
                        all:            baseUrl + 'suggestions',
                        add:            baseUrl + 'suggestions'
                    },
                    comments: {
                        get:            baseUrl + 'comments/',
                        add:            baseUrl + 'comments'
                    }
                };
            }
        ]);
})();
