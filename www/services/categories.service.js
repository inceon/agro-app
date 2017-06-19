/**
 * Categories model
 */
(function() {
    'use strict';

    angular
        .module('model.categories', [])
        .service('categories', categories);

    categories.$inject = ['http', 'url'];

    function categories(http, url) {

        return {
            all: all,
            one: one
        };

        function all() {
            return http
                .get(url.categories.all)
                .then(function (res) {
                    return res;
                });
        }

        function one(categoryId) {
            return http
                .get(url.categories.one + categoryId)
                .then(function (res) {
                    return res;
                });
        }
    }
})();
