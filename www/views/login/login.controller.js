/**
 * Controller for login page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Login', Login);

    Login.$inject = ['$rootScope', '$state', '$sessionStorage', 'user', '$localStorage'];

    function Login($rootScope, $state, $sessionStorage, user, $localStorage) {

        $rootScope.page = {};

        var vm = this;
        vm.login = login;
        vm.signup = signup;
        vm.reset = reset;
        vm.data = {};

        /**
         * Function for send data to server
         * and login user
         */
        function login(form) {
            if (form.$invalid) { return; }
            vm.data.phone = '+38' + vm.data.phone;
            user.login(vm.data)
                .then(function (res) {
                    $state.go('app.main');
                });
        }

        function signup(){
            $state.go('signup');
        }
        function reset(){
            $state.go('password');
        }
    }
})();
