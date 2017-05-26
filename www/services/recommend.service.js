/**
 * Recommend model
 */
(function() {
    'use strict';

    angular
        .module('model.recommend', [])
        .service('recommend', recommend);

    recommend.$inject = ['http', 'url'];

    function recommend(http, url) {

        return {
            all: all,
            add: add
        };

        function all() {
            return http
                .get(url.suggestion)
                .then(function (res) {
                    return res.results;
                });
        }

        /**
         *
         * @param {object} data
         * @param {string} data.user - user id
         * @param {string} data.text - recommend text
         */
        function add(data) {
            return http
                .post(url.suggestion, data)
                .then(function (res) {
                    return res.results;
                });
        }

    }
})();
