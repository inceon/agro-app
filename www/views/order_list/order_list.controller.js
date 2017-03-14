(function () {
    "use strict";

    angular
        .module('app')
        .controller('OrderList', OrderList);

    OrderList.$inject = ['$rootScope', '$scope', '$ionicPopup'];

    function OrderList($rootScope, $scope, $ionicPopup) {

        var vm = this;
        vm.buy = buy;
        vm.sell = sell;
        vm.showModal = showModal;

        vm.items = [
            {
                img: 'fa-shopping-cart',
                name: 'Юлія',
                surname: 'Кириченко',
                text: 'Вже давно відомо, що читабельний зміст буде заважати зосередитись людині, яка ',
                city: 'Київ, Полтава',
                hashtags: ['#зернові', '#мясо']
            },
            {
                img: 'fa-arrows',
                name: 'Юлія',
                surname: 'Кириченко',
                text: 'Вже давно відомо, що читабельний зміст буде заважати зосередитись людині, яка оцінює композицію сторінки. Сенс використання Lorem Ipsum полягає в тому, що цей текст має більш-менш нормальне розподілення літер на відміну від, наприклад, "Тут іде текст. Тут іде текст."',
                city: 'Київ, Полтава',
                hashtags: ['#зернові', '#мясо']
            },
            {
                img: 'fa-bolt',
                name: 'Юлія',
                surname: 'Кириченко',
                text: 'Вже давно відомо, що читабельний зміст буде заважати зосередитись ',
                city: 'Київ, Полтава',
                hashtags: ['#зернові', '#мясо']
            }
        ];

        function sell() {
            vm.showModal();
        }

        function buy() {
            vm.showModal();
        }

        function showModal() {
            var alertPopup = $ionicPopup.alert({
                title: 'Don\'t eat that!',
                template: 'It might taste good',
                buttons: []
            });

            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        }

    }
})();
