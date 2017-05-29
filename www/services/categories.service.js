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
            one: one,
            subcategories: subcategories
        };

        function all() {
            return http
                .get(url.categories)
                .then(function (res) {
                    return res.results;
                });
        }

        function one(categoryId) {
            return http
                .get(url.categories, {
                    where: {
                        "objectId": categoryId
                    }
                })
                .then(function (res) {
                    return res.results;
                });
        }

        function subcategories(categoryId) {
            return http
                .get(url.subcategories, {
                    where: {
                        "category": categoryId
                    }
                })
                .then(function (res) {
                    return res.results;
                });
        }

    }
})();
