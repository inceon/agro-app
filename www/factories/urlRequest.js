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
                var loginUrl = 'https://parseapi.back4app.com/login';
                var meUrl = 'https://parseapi.back4app.com/users/me';
                var updateUser = 'https://parseapi.back4app.com/users/';

                return {
                    user:           baseUrl + '_User',
                    news:           baseUrl + 'News',
                    categories:     baseUrl + 'Categories',
                    subcategories:  baseUrl + 'Subcategories',
                    suggestion:     baseUrl + 'Suggestion',
                    services:       baseUrl + 'Services',
                    comments:       baseUrl + 'Comments',
                    offers:         baseUrl + 'Offers',
                    files:          baseUrl + 'Files',
                    chat:           baseUrl + 'Chat',
                    bookmark:       baseUrl + 'Bookmark',
                    uploadfile:     baseFileUrl,
                    login:          loginUrl,
                    me:             meUrl,
                    updateUser:     updateUser
                };
            }
        ]);
})();
