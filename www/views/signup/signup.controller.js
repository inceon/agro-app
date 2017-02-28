/**
 * Controller for signup page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Signup', Signup);

    Signup.$inject = ['$state', '$ionicHistory', 'util', 'site', 'user'];

    function Signup($state, $ionicHistory, util, site, user) {

        var vm = this;
        vm.signup = signup;
        vm.data = {};

        /**
         * Function for validation signup data
         * and send data to server
         */
        function signup() {

        }
    }
})();
