(function() {
    'use strict';

    angular
        .module('model.chat', [])
        .service('chat', chat);

    chat.$inject = ['http', 'url'];

    function chat(http, url) {

        return {
            all: all,
            col: col,
            add: add,
            newest: newest
        };

        function all() {
            return http
                .get(url.chat, {
                    limit: 50
                })
                .then(function (res) {
                    return res.results;
                });
        }

        function col() {
            return http
                .get(url.chat, {
                    limit: 0,
                    count: 1
                })
                .then(function (res) {
                    return res.count;
                });
        }

        /**
         *
         * @param {object} data
         * @param {string} data.source - sourceId
         * @param {string} data.user - userId
         * @param {string} data.text - comment text
         */
        function add(data) {
            return http
                .post(url.chat, data)
                .then(function (res) {
                    return res;
                });
        }

        function newest(date) {
            return http
                .get(url.chat, {
                    where: {
                        createdAt: {
                         "$gt": date
                        }
                    }
                })
                .then(function (res) {
                    return res.count;
                });
        }
    }
})();
