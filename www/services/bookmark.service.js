(function() {
    'use strict';

    angular
        .module('model.bookmark', [])
        .service('bookmark', bookmark);

    bookmark.$inject = ['http', 'url'];

    function bookmark(http, url) {

        return {
            all: all,
            add: add,
            remove: remove
        };

        function all() {
            // TODO current user
            return http
                .get(url.bookmark, {
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
         * @param {object} data
         * @param {string} data.user - userId
         * @param {string} data.offer - offerId
         */
        function add(data) {
            return http
                .post(url.bookmark, data)
                .then(function (res) {
                    return res.results;
                });
        }

        function remove(bookmarkId) {
            return http
                .delete(url.bookmark +'/' +bookmarkId)
                .then(function (res) {
                    return res;
                })
        }

    }
})();
