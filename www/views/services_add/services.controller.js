(function () {
    "use strict";

    angular
        .module('app')
        .controller('ServicesAdd', ServicesAdd);

    ServicesAdd.$inject = ['$rootScope', '$state', '$q', '$stateParams', '$ionicHistory', 'services', 'files', 'toastr'];

    function ServicesAdd($rootScope, $state, $q, $stateParams, $ionicHistory, services, files, toastr) {
        var vm = this;

        vm.search = search;
        vm.changeCity = changeCity;
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
                vm.data.location = vm.data.location.description;
                vm.data.user = $rootScope.user.objectId;
o
                services.add(vm.data)
                    .then(function (res) {
                        var source = res.objectId;
                        angular.forEach(vm.data.attach, function (file) {
                            files.upload(file)
                                .then(function (res) {
                                    files.add({
                                        source: source,
                                        file: res.url
                                    });
                                });
                        });

                        $ionicHistory.currentView($ionicHistory.backView());
                        $state.go("app.services", $stateParams, {location: 'replace'});
                    });
            } else {
                toastr.error('Заповніть всі текстові поля');
            }
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

        function changeCity(){
            console.log('click');
            console.log(vm.data.location);
        }

        /**
         * Function for back button
         */
        function back() {
            $ionicHistory.goBack();
        }
    }
})();
