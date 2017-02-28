(function () {
    "use strict";

    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope', '$ionicModal', '$timeout'];

    function AppCtrl($scope, $ionicModal, $timeout) {

        var vm = this;
        vm.doLogin = doLogin;

        vm.loginData = {};

        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        $scope.login = function() {
            $scope.modal.show();
        };

        function doLogin() {
            console.log('Doing login', vm.loginData);

            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        }
    }
})();
