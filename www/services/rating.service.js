/**
 * Rating model
 */
(function() {
    'use strict';

    angular
        .module('model.rating', [])
        .service('rating', rating);

    rating.$inject = ['http', 'url'];

    function rating(http, url) {

        return {
            getItems: getItems,
            add: add
        };

        function getItems(userId) {
            return http
                .get(url.rating, {
                    where: {
                        "userId": userId
                    }
                })
                .then(function (res) {
                    return res.results;
                });
        }

        /**
         *
         * @param {object} data
         * @param {string} data.userId
         * @param {integer} data.stars
         * @param {string} data.text
         * @param {object} data.* - current user info
         */
        function add(data) {
            return http
                .post(url.rating, data)
                .then(function (res) {
                    return res;
                });
        }
    }
})();
