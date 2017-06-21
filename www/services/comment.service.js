(function() {
    'use strict';

    angular
        .module('model.comments', [])
        .service('comments', comments);

    comments.$inject = ['http', 'url'];

    function comments(http, url) {

        return {
            add: add
        };

        /**
         *
         * @param {object} data
         * @param {string} data.source - sourceId
         * @param {string} data.user - userId
         * @param {string} data.text - comment text
         */
        function add(data) {
            return http
                .post(url.comments.add, data)
                .then(function (res) {
                    return res;
                });
        }
    }
})();
