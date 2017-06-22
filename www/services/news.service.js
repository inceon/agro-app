/**
 * News model
 */
(function() {
    'use strict';

    angular
        .module('model.news', [])
        .service('news', news);

    news.$inject = ['http', 'url'];

    function news(http, url) {

        return {
            all: all,
            one: one
        };

        function all() {
            return http
                .get(url.news.all)
                .then(function (res) {
                    return res;
                });
        }

        function one(newsId) {
            return http
                .get(url.news.one + newsId)
                .then(function (res) {
                    return res;
                });
        }
    }
})();
