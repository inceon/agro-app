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
            add: add,
            one: one,
            my: my,
            col: col,
            remove: remove,
            allInCategory: allInCategory,
            allInSubCategory: allInSubCategory,
            images: images,
            comments: comments
        };

        /**
         *
         * @param {object} data
         * @param {string} data.type (buy | sell)
         * @param {string} data.user - userId
         * @param {string} data.category - categoryId
         * @param {string} data.subcategory - subcategoryId
         */
        function add(data) {
            return http
                .post(url.offers, data)
                .then(function (res) {
                    return res;
                });
        }

        function one(offerId) {
            return http
                .get(url.offers, {
                    where: {
                        "objectId": offerId
                    }
                })
                .then(function (res) {
                    return res.results;
                });
        }

        function my() {
            // TODO current user
            return http
                .get(url.offers, {
                    where: {
                        "user": 'm0pnvXvF5y'
                    }
                })
                .then(function (res) {
                    return res.results;
                });
        }

        /**
         *
         * @param {string} type (buy or sell)
         */
        function col(type) {
            return http
                .get(url.offers, {
                    where: {
                        "type": type
                    }
                })
                .then(function (res) {
                    return res.results.length;
                });
        }

        function remove(offerId) {
            return http
                .delete(url.offers +'/' +offerId)
                .then(function (res) {
                    return res;
                })
        }

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
