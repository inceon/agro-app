/**
 * Module for connect all core modules
 */
(function () {
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
            'ngCordova',
            /*
             * Our reusable cross app code modules
             */

            'toastr',
            'ui.mask',

            /*
             * 3rd Party modules
             */
            'ionic.closePopup',
            'ionic'
        ])
        .constant('back4app', {
            appId: 'fPfi2t7V7TqDfJzdUpa220ZsiWbx7FGJbgoR6Mdz',
            token: 'smwDVqORGP1zeMPeLzlfjOP61dWbbQmK4fPER6HA'
        });
})();
