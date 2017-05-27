/**
 * Offers model
 */
(function() {
    'use strict';

    angular
        .module('model.offers', [])
        .service('offers', offers);

    offers.$inject = ['http', 'url'];

    function offers(http, url) {

        return {
            all: all,
            subcategories: subcategories
        };

        function all() {
            return http
                .get(url.categories)
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
