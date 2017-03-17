(function () {
    "use strict";

    angular
        .module('app')
        .controller('OrderList', OrderList);

    OrderList.$inject = ['$state', '$scope', '$ionicPopup', 'IonicClosePopupService'];

    function OrderList($state, $scope, $ionicPopup, IonicClosePopupService) {

        var vm = this;
        vm.buy = buy;
        vm.sell = sell;
        vm.showModal = showModal;
        vm.select = select;
        vm.alertPopup = null;
        vm.callUser = callUser;

        vm.items = [
            {
                number: '+380957542354',
                img: 'fa-shopping-cart',
                name: 'Юлія',
                surname: 'Кириченко',
                text: 'Вже давно відомо, що читабельний зміст буде заважати зосередитись людині, яка ',
                city: 'Київ, Полтава',
                hashtags: ['#зернові', '#мясо']
            },
            {
                number: '+380957542354',
                img: 'fa-arrows',
                name: 'Юлія',
                surname: 'Кириченко',
                text: 'Вже давно відомо, що читабельний зміст буде заважати зосередитись людині, яка оцінює композицію сторінки. Сенс використання Lorem Ipsum полягає в тому, що цей текст має більш-менш нормальне розподілення літер на відміну від, наприклад, "Тут іде текст. Тут іде текст."',
                city: 'Київ, Полтава',
                hashtags: ['#зернові', '#мясо']
            },
            {
                number: '+380957542354',
                img: 'fa-bolt',
                name: 'Юлія',
                surname: 'Кириченко',
                text: 'Вже давно відомо, що читабельний зміст буде заважати зосередитись ',
                city: 'Київ, Полтава',
                hashtags: ['#зернові', '#мясо']
            }
        ];

        function sell() {
            vm.showModal('Продать сіно');
        }

        function buy() {
            vm.showModal('Купить сіно');
        }

        function showModal(title) {
            vm.alertPopup =  $ionicPopup.show({
                templateUrl: 'views/order_list/tags.popup.html',
                title: title,
                cssClass: 'order-tags-popup',
                scope: $scope,
                buttons: []
            });

            IonicClosePopupService.register(vm.alertPopup);
        }

        function select(name) {
            console.log(name);
            vm.alertPopup.close();
            $state.go('app.order_add');
        }
        
        function callUser(number) {
            vm.callDialog = $ionicPopup.show({
                templateUrl: 'views/order_list/call.popup.html',
                scope: $scope,
                cssClass: 'call-popup',
                buttons: []
            });

            IonicClosePopupService.register(vm.callDialog);
        }

    }
})();
