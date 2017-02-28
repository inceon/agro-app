(function () {
    "use strict";

    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope', '$state'];

    function AppCtrl($scope, $state) {

        var vm = this;
        vm.logout = logout;
        vm.data = {};

        function logout() {
            $state.go('login');
        }

    }
})();
