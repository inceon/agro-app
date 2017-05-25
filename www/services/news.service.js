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
                .get(url.news)
                .then(function (res) {
                    return res.results;
                });
        }

        function one(newsId) {
            return http
                .get(url.news, {
                    where: {
                        "objectId": newsId
                    }
                })
                .then(function (res) {
                    return res.results;
                });
        }

    }
})();
