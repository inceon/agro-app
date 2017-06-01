(function () {
    "use strict";

    angular
        .module('app')
        .controller('offerAdd', offerAdd);

    offerAdd.$inject = ['$rootScope', '$state', '$q', '$stateParams', '$ionicHistory', 'offers', 'files'];

    function offerAdd($rootScope, $state, $q, $stateParams, $ionicHistory, offers, files) {
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
            vm.data.location = vm.data.location.description;
            vm.data.category = vm.section.objectId;
            vm.data.subcategory = vm.tag.objectId;
            vm.data.type = vm.type;
            vm.data.user = $rootScope.user.objectId;

            offers.add(vm.data)
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
                    $state.go("app.offer_list", $stateParams,  {location:'replace'} );
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
