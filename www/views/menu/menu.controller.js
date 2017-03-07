(function () {
    "use strict";

    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope', '$state'];

    function AppCtrl($scope, $state) {

        var vm = this;
        vm.logout = logout;
        vm.profile = profile;
        vm.data = {};

        function logout() {
            $state.go('login');
        }

        function profile() {
            $state.go('app.profile');
        }

    }
})();
