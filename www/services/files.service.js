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
            upload: upload,
            add: add
        };

        function upload(file) {
            return http.file(url.uploadfile + file.name, file)
                .then(function (res) {
                    return res.data;
                })
        }

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
