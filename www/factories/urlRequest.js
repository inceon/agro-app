/**
 * Factory for store api url
 */
(function () {
    'use strict';
    angular
        .module('factory.urlRequest', [])
        .factory('url', [
            function () {

                var baseUrl = 'https://parseapi.back4app.com/classes/';
                var baseFileUrl = 'https://parseapi.back4app.com/files/';

                return {
                    user:           baseUrl + '',
                    news:           baseUrl + 'News',
                    categories:     baseUrl + 'Categories',
                    subcategories:  baseUrl + 'Subcategories',
                    suggestion:     baseUrl + 'Suggestion',
                    services:       baseUrl + 'Services',
                    comments:       baseUrl + 'Comments',
                    offers:         baseUrl + 'Offers',
                    files:          baseUrl + 'Files',
                    uploadfile:     baseFileUrl
                };
            }
        ]);
})();
