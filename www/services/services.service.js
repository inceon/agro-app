/**
 * Recommend model
 */
(function() {
    'use strict';

    angular
        .module('model.services', [])
        .service('services', services);

    services.$inject = ['http', 'url'];

    function services(http, url) {

        return {
            all: all,
            add: add,
            images: images
        };

        function all() {
            return http
                .get(url.services)
                .then(function (res) {
                    return res.results;
                });
        }

        /**
         *
         * @param {object} data
         */
        function add(data) {
            return http
                .post(url.services, data)
                .then(function (res) {
                    return res;
                });
        }

        function images(serviceId) {
            return http
                .get(url.files, {
                    where: {
                        "source": serviceId
                    }
                })
                .then(function (res) {
                    return res.results;
                });
        }

    }
})();
