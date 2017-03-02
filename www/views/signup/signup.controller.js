/**
 * Controller for signup page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Signup', Signup);

    Signup.$inject = ['$state', '$ionicHistory', 'user'];

    function Signup($state, $ionicHistory, user) {

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
