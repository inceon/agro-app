/**
 * FIles model
 */
(function() {
    'use strict';

    angular
        .module('model.files', [])
        .service('files', files);

    files.$inject = ['http', 'url'];

    function files(http, url) {

        return {
            add: add
        };

        /**
         *
         * @param {object} data
         * @param {string} data.source - sourceId
         * @param {string} data.file - file url
         */
        function add(data) {
            return http
                .post(url.files, data)
                .then(function (res) {
                    return res.results;
                });
        }
    }
})();
