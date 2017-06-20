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
            remove: remove,
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
                .get(url.offers.one + offerId)
                .then(function (res) {
                    return res;
                });
        }

        function my() {
            return http
                .get(url.users.my_offers)
                .then(function (res) {
                    return res;
                });
        }

        function remove(offerId) {
            return http
                .delete(url.offers.one + offerId)
                .then(function (res) {
                    return res;
                })
        }

    }
})();
