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
            upload: upload
        };

        function upload(files) {
            return http.file(url.site.files, files)
                .then(function (res) {
                    return res.data;
                })
        }
    }
})();
