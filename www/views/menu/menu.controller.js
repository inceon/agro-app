(function () {
    "use strict";

    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$state'];

    function AppCtrl($state) {

        var vm = this;
        vm.logout = logout;
        vm.profile = profile;

        function logout() {
            $state.go('login');
        }

        function profile() {
            $state.go('app.profile');
        }
    }
})();
