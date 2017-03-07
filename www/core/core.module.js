/**
 * Module for connect all core modules
 */
(function() {
    'use strict';
    angular
        .module('app.core', [
        /*
         * Angular modules
         */
        'ngStorage',
        'ngMessages',
        'ngMaterial',
        'ngFileUpload',
        /*
         * Our reusable cross app code modules
         */

        /*
         * 3rd Party modules
         */
        'ionic'
        ])
})();
