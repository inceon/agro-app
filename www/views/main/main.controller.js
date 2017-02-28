(function () {
    "use strict";

    angular
        .module('app')
        .controller('Main', Main);

    Main.$inject = ['$rootScope', '$state', '$ionicHistory', 'user'];

    function Main($rootScope, $state, $ionicHistory, user) {

        var vm = this;

    }
})();
