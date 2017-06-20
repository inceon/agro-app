/**
 * Controller for signup page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Signup', Signup);

    Signup.$inject = ['$state', '$ionicHistory', 'toastr', 'user'];

    function Signup($state, $ionicHistory, toastr, user) {

        var vm = this;
        vm.signup = signup;
        vm.data = {};

        /**
         * Function for validation signup data
         * and send data to server
         */
        function signup(form) {
            if (form.$invalid) { return; }
            if (vm.data.password != vm.data.rpassword) {
                toastr.error('Паролі не співпадають');
                return;
            }

            vm.data.phone = '+38' + vm.data.phone;

            user.signup(vm.data)
                .then(function (res) {
                    $state.go('app.main');
                });
        }
    }
})();
