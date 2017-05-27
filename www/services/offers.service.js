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
            allInCategory: allInCategory,
            allInSubCategory: allInSubCategory,
            images: images,
            comments: comments
        };

        function allInCategory(categoryId, type) {
            return http
                .get(url.offers, {
                    where: {
                        "category": categoryId,
                        "type": type
                    }
                })
                .then(function (res) {
                    return res.results;
                });
        }

        function allInSubCategory(subcategoryId, type) {
            return http
                .get(url.offers, {
                    where: {
                        "subcategory": subcategoryId,
                        "type": type
                    }
                })
                .then(function (res) {
                    return res.results;
                });
        }

        function images(offerId) {
            return http
                .get(url.files, {
                    where: {
                        "source": offerId
                    }
                })
                .then(function (res) {
                    return res.results;
                });
        }

        function comments(offerId) {
            return http
                .get(url.comments, {
                    where: {
                        "source": offerId
                    }
                })
                .then(function (res) {
                    return res.results;
                });
        }

    }
})();
