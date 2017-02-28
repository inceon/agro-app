(function () {
    "use strict";

    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope'];

    function AppCtrl($scope) {

        var vm = this;
        vm.logout = logout;
        vm.data = {};

        function logout() {
            console.log('logout');
        }

    }
})();
