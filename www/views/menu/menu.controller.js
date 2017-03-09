(function () {
    "use strict";

    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope', '$state', '$ionicModal', '$timeout'];

    function AppCtrl($scope, $state, $ionicModal, $timeout) {

        var vm = this;
        vm.logout = logout;
        vm.profile = profile;
        vm.showMap = showMap;
        vm.data = {};

        function logout() {
            $state.go('login');
        }

        function profile() {
            $state.go('app.profile');
        }

        function showMap() {
            if(vm.modal) {
                vm.modal.show();
            } else {
                $ionicModal.fromTemplateUrl('views/order_list/map.modal.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    vm.modal = modal;
                    vm.modal.show();
                    var latLng = new google.maps.LatLng(50, 50);

                    var mapOptions = {
                        center: latLng,
                        zoom: 5,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    vm.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                });
            }

            vm.closeModal = function() {
                vm.modal.hide();
            };
            // Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function() {
                vm.modal.remove();
            });
        }

    }
})();
