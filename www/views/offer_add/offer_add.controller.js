(function () {
    "use strict";

    angular
        .module('app')
        .controller('offerAdd', offerAdd);

    offerAdd.$inject = ['$rootScope', '$scope', '$q', '$stateParams', '$ionicHistory'];

    function offerAdd($rootScope, $scope, $q, $stateParams, $ionicHistory) {
        var vm = this;

        vm.search = search;
        vm.changeCity = changeCity;
        vm.upload = upload;
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
            console.log($files);
            vm.data.attach = vm.data.attach.concat($files);
            if(vm.data.attach.length > 3)
                vm.data.attach = vm.data.attach.slice(-3)[0];

            // angular.forEach($files, function (file) {
            //     vm.data[file.lastModified] = file;
            // });

            console.log(vm.data);
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
            console.log(vm.selectedItem);
        }

        /**
         * Function for back button
         */
        function back() {
            $ionicHistory.goBack();
        }
    }
})();
