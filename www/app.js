/**
 * Function that runs when application start
 * it include services, factories, filters, directives modules
 */
(function () {
    'use strict';
    angular
        .module('app', [
            'app.core',
            'services.module',
            'directives.module',
            'filters.module',
            'factories.module'
        ])
        .run(runBlock);
    runBlock.$inject = ['$ionicPlatform', '$localStorage', '$sessionStorage', 'user', '$rootScope', '$state', '$ionicHistory'];
    function runBlock($ionicPlatform, $localStorage, $sessionStorage, user, $rootScope, $state, $ionicHistory) {

        /**
         * Function that runs when platform ready
         */
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            if ($localStorage.auth_key) {
                $sessionStorage.auth_key = $localStorage.auth_key;
            }


            /**
             * Check whether the user is authorized
             */
            if ($sessionStorage.auth_key) {
                $state.go('app.main');
            } else {
                $state.go('app.main');
            }

        });

    }
})();
