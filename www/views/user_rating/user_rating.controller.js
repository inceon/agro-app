/**
 * Controller for user rating page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('UserRating', UserRating);

    UserRating.$inject = ['$rootScope', '$stateParams', '$ionicModal', '$scope', 'user', 'rating'];

    function UserRating($rootScope, $stateParams, $ionicModal, $scope, user, rating) {

        var vm = this;

        /**
         * Склонение числительных
         *
         * @param integer количество
         * @param array варианты склонений [для одного, для двух-четырёх, больше четырёх]
         * @return string
         */
        function num2str(n, text_forms) {
            n      = Math.abs(n) % 100;
            var n1 = n % 10;

            if (n > 10 && n < 20) {
                return text_forms[2];
            }

            if (n1 > 1 && n1 < 5) {
                return text_forms[1];
            }

            if (n1 == 1) {
                return text_forms[0];
            }

            return text_forms[2];
        }

        vm.addRating = addRating;
        vm.userId = $stateParams.userId;

        user.one(vm.userId)
            .then(function(res) {
                vm.user = res[0];
            });

        vm.data = {
            stars: 0
        };

        rating.getItems(vm.userId)
            .then(function (res) {
                vm.items = res;
                getCounts();
            });

        function getCounts() {
            vm.colStars = vm.items.length + num2str(vm.items.length, [' оцінка', ' оцінки', ' оцінок']);
            vm.midStars = vm.items.reduce(function (sum, cur) {return sum + cur.stars;}, 0) / vm.items.length;
        }

        function addRating() {
            vm.items.push({
                photo: $rootScope.user.photo,
                name: $rootScope.user.name,
                surname: $rootScope.user.surname,
                stars: vm.data.stars,
                text: vm.data.text
            });

            vm.data.userId = vm.userId;
            vm.data.photo = $rootScope.user.photo;
            vm.data.name = $rootScope.user.name;
            vm.data.surname= $rootScope.user.surname;

            rating.add(vm.data)
                .then(function (res) {
                    vm.data = {};
                    vm.data.stars = 0;
                    vm.modal.hide();
                    getCounts();
                });
        }

        $ionicModal.fromTemplateUrl('views/user_rating/add_rating.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            vm.modal = modal;
        });

    }
})();
