/**
 * Controller for login page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Login', Login);

    Login.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', 'util'];

    function Login($rootScope, $state, $ionicHistory, user, util) {

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
        function login() {
            $state.go('app.main');
        }

        function signup(){
            $state.go('signup');
        }
        function reset(){
            $state.go('password');
        }
    }
})();
