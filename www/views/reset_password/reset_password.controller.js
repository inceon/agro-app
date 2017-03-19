/**
 * Controller for reset password
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Password', Password);

    Password.$inject = ['$rootScope', '$state'];

    function Password($rootScope, $state) {
        var vm = this;
        vm.isReset = false;
        vm.recover = recover;
        vm.backToLogin = backToLogin;

        function recover() {
            vm.isReset = true;
        }

        function backToLogin() {
            $state.go('login');
        }
    }
})();
