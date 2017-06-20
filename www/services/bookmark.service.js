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
                .get(url.users.favourites)
                .then(function (res) {
                    return res;
                });
        }

        function add(offerId) {
            return http
                .post(url.offers.one + offerId + '/add_to_favourites')
                .then(function (res) {
                    return res;
                });
        }

        function remove(offerId) {
            return http
                .delete(url.offers.one + offerId + '/add_to_favourites')
                .then(function (res) {
                    return res;
                });
        }

    }
})();
