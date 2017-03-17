/**
 * Controller for user rating page
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('UserRating', UserRating);

    UserRating.$inject = ['$state', '$ionicHistory', '$ionicModal', '$scope'];

    function UserRating($state, $ionicHistory, $ionicModal, $scope) {

        var vm = this;
        vm.addRating = addRating;
        vm.data = {
            rating: 0
        };
        vm.items = [
            {
                avatar: 'img/cm_5Wvf1VuE.jpg',
                name: 'Юлія',
                surname: 'Кириченко',
                rating: 2,
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad aut, cumque dolores et ipsum magnam minima quam similique sit.'
            },
            {
                avatar: 'img/cm_5Wvf1VuE.jpg',
                name: 'Юлія',
                surname: 'Кириченко',
                rating: 5,
                text: 'Lorem ipsum dolor sit amet, '
            }
        ];

        function addRating() {
            vm.items.push({
                avatar: 'img/cm_5Wvf1VuE.jpg',
                name: 'Юлія',
                surname: 'Кириченко',
                rating: vm.data.rating,
                text: vm.data.text
            });
            delete vm.data.text;
            vm.data.rating = 0;
            vm.modal.hide();
        }

        $ionicModal.fromTemplateUrl('views/user_rating/add_rating.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            vm.modal = modal;
        });

    }
})();
