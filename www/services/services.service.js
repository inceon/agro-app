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
            one: one
        };

        function all() {
            return http
                .get(url.services.all)
                .then(function (res) {
                    return res;
                });
        }

        /**
         *
         * @param {object} data
         * @param {string} data.text
         * @param {string} data.location
         * @param {string} data.address
         * @param {array} data.images - images link
         */
        function add(data) {
            return http
                .post(url.services.add, data)
                .then(function (res) {
                    return res;
                });
        }

        function one(serviceId) {
            return http
                .get(url.services.one + serviceId)
                .then(function (res) {
                    return res;
                });
        }

    }
})();
