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
                .get(url.suggestion.all)
                .then(function (res) {
                    return res;
                });
        }

        /**
         *
         * @param {object} data
         * @param {string} data.body - recommend text
         */
        function add(data) {
            return http
                .post(url.suggestion.add, data)
                .then(function (res) {
                    return res;
                });
        }

    }
})();
