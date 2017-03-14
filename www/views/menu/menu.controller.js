(function () {
    "use strict";

    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope', '$state', '$ionicModal', '$q'];

    function AppCtrl($scope, $state, $ionicModal, $q) {

        var vm = this;
        vm.logout = logout;
        vm.profile = profile;
        vm.showMap = showMap;
        vm.mapSearch = mapSearch;
        vm.search = search;
        vm.changeCity = changeCity;
        vm.selectedItem = '';
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

                    // vm.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                    vm.gmapsService = new google.maps.places.AutocompleteService();
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

        function mapSearch() {
            $scope.coord = [0, 0];
        }

        function search(address) {
            var deferred = $q.defer();
            getResults(address).then(
                function (predictions) {
                    var results = [];
                    for (var i = 0, prediction; prediction = predictions[i]; i++) {
                        results.push(prediction);
                    }
                    deferred.resolve(results);
                }
            );
            return deferred.promise;
        }

        function getResults(address) {
            var deferred = $q.defer();
            try {
                vm.gmapsService.getPlacePredictions({
                    input: address,
                    types: ['(cities)'],
                    componentRestrictions: {country: 'ua'}
                }, function (data) {
                    console.log(data);
                    deferred.resolve(data);
                });
            } catch (e) {}
            return deferred.promise;
        }

        function changeCity(){
            console.log('click');
            console.log(vm.selectedItem);
        }
    }
})();
