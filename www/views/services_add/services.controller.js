(function () {
    "use strict";

    angular
        .module('app')
        .controller('ServicesAdd', ServicesAdd);

    ServicesAdd.$inject = ['$rootScope', '$state', '$q', '$stateParams', '$ionicHistory', 'services', 'files', 'toastr'];

    function ServicesAdd($rootScope, $state, $q, $stateParams, $ionicHistory, services, files, toastr) {
        var vm = this;

        vm.search = search;
        vm.upload = upload;
        vm.add = add;
        vm.remove = remove;
        vm.back = back;

        vm.gmapsService = new google.maps.places.AutocompleteService();
        vm.data = {
            attach: []
        };

        angular.extend(vm, $stateParams);

        /**
         * Function for uploading files, file save in RAM
         * @param $files
         */
        function upload($files) {
            vm.data.attach = vm.data.attach.concat($files);
            if(vm.data.attach.length > 3)
                vm.data.attach = vm.data.attach.slice(-3)[0];
        }

        function add() {
            if(!!vm.data.location && !!vm.data.location.description) {
                vm.data.address = vm.data.location.description;

                if (vm.data.attach.length) {
                    files.upload(vm.data.attach)
                        .then(function (images) {
                            selectAddressAndSendRequest(images);
                        });
                } else {
                    selectAddressAndSendRequest();
                }
            } else {
                toastr.error('Заповніть всі текстові поля');
            }
        }

        function selectAddressAndSendRequest(images) {
            onSelectAddress(vm.data.location.description, function (res) {
                vm.data.location = res.lat + '/' + res.lng;
                vm.data.images = images;
                services.add(vm.data)
                    .then(function (res) {
                        $ionicHistory.currentView($ionicHistory.backView());
                        $state.go("app.services", $stateParams, {location: 'replace'});
                    });
            });
        }

        /**
         * Function for removing attach file
         */
        function remove(index) {
            vm.data.attach.splice(index, 1);
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

        function onSelectAddress(address, callback) {
            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    callback({
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    });
                }
            });
        }

        /**
         * Function for back button
         */
        function back() {
            $ionicHistory.goBack();
        }
    }
})();
