(function() {
    'use strict';

    angular
        .module('model.bookmark', [])
        .service('bookmark', bookmark);

    bookmark.$inject = ['http', 'url', '$rootScope'];

    function bookmark(http, url, $rootScope) {

        return {
            all: all,
            add: add,
            remove: remove
        };

        function all() {
            return http
                .get(url.bookmark, {
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
