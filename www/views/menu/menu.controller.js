(function () {
    "use strict";

    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$state', 'user'];

    function AppCtrl($state, user) {

        var vm = this;
        vm.logout = logout;
        vm.profile = profile;
        vm.bookmark = bookmark;
        vm.my_offers = my_offers;

        function logout() {
            user.logout();
            $state.go('login');
        }

        function profile() {
            $state.go('app.profile');
        }

        function bookmark() {
            $state.go('app.bookmark');
        }

        function my_offers() {
            $state.go('app.my_offers');
        }
    }
})();
