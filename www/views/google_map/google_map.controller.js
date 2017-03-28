(function () {
    "use strict";

    angular
        .module('app')
        .controller('GoogleMap', GoogleMap);

    GoogleMap.$inject = ['$scope', '$stateParams', '$q', '$rootScope', '$ionicHistory'];

    function GoogleMap($scope, $stateParams, $q, $rootScope, $ionicHistory) {
        var vm = this;

        vm.mapSearch = mapSearch;
        vm.search = search;
        vm.changeCity = changeCity;
        vm.back = back;
        $rootScope.filter = {};
        vm.selectedItem = '';


        var latLng = new google.maps.LatLng(0, 0);

        var mapOptions = {
            center: $stateParams.city ? $stateParams.city: latLng,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        vm.geocoder = new google.maps.Geocoder();
        vm.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        marker = new google.maps.Marker({
            map: vm.map,
            position: $stateParams.city
        });
        vm.gmapsService = new google.maps.places.AutocompleteService();

        function mapSearch() {
            $scope.coord = [0, 0];
        }

        function search(address) {
            var deferred = $q.defer();
            getResults(address).then(
                function (predictions) {
                    var results = [];
                    if (predictions) {
                        for (var i = 0, prediction; prediction = predictions[i]; i++) {
                            results.push(prediction);
                        }
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
                    componentRestrictions: {country: 'ua'}
                }, function (data) {
                    deferred.resolve(data);
                });
            } catch (e) {
                console.log(e);
            }
            return deferred.promise;
        }

        var marker = new google.maps.Marker();

        function changeCity() {
            if (vm.selectedItem) {
                console.log(vm.selectedItem);
                $rootScope.filter.city = vm.selectedItem.terms[0].value + ', ' + vm.selectedItem.terms[1].value;
                vm.geocoder.geocode({'address': vm.selectedItem.description}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        vm.map.setCenter(results[0].geometry.location);
                        
                        vm.searchText = vm.selectedItem.description;
                        marker.setMap(null);
                        marker = new google.maps.Marker({
                            map: vm.map,
                            position: results[0].geometry.location
                        });
                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                });
            }
        }

        /**
         * Function for back button
         */
        function back() {
            $ionicHistory.goBack();
        }
    }
})();