/**
 * User model
 */
(function () {
    'use strict';

    angular
        .module('model.user', [])
        .service('user', user);

    user.$inject = ['http', 'url', '$rootScope', '$sessionStorage', '$state', '$localStorage'];
    function user(http, url, $rootScope, $sessionStorage, $state, $localStorage) {

        return {
            logout: logout
        };

        /**
         * Function for logout user
         */
        function logout() {
            delete $rootScope.user;
            delete $sessionStorage.auth_key;
            delete $localStorage.auth_key;
        }
    }
})();
