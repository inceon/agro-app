/**
 * Offers model
 */
(function() {
    'use strict';

    angular
        .module('model.offers', [])
        .service('offers', offers);

    offers.$inject = ['http', 'url', '$rootScope'];

    function offers(http, url, $rootScope) {

        return {
            all: all,
            add: add,
            one: one,
            my: my,
            col: col,
            remove: remove,
            images: images,
            comments: comments
        };

        /**
         *
         * @param {object} data
         * @param {string} data.type - (buy / sell)
         * @param {string} data.category - id category
         * @param {string} data.subcategory - id subcategory
         */
        function all(data) {
            return http
                .get(url.offers.all, data)
                .then(function (res) {
                    return res;
                });
        }


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
                .post(url.offers.add, data)
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
            return http
                .get(url.offers, {
                    where: {
                        "user": $rootScope.user.objectId
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
