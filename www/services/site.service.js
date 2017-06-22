(function() {
    'use strict';

    angular
        .module('model.site', [])
        .service('site', site);

    site.$inject = ['http', 'url', '$rootScope'];

    function site(http, url, $rootScope) {

        return {
            count: count
        };

        function count() {
            return http
                .get(url.site.count)
                .then(function (res) {
                    return res;
                });
        }

    }
})();
