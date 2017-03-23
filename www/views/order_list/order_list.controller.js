(function () {
    "use strict";

    angular
        .module('app')
        .controller('OrderList', OrderList);

    OrderList.$inject = ['$state', '$scope', '$ionicPopup', 'IonicClosePopupService', '$ionicModal', '$stateParams'];

    function OrderList($state, $scope, $ionicPopup, IonicClosePopupService, $ionicModal, $stateParams) {

        var vm = this;
        vm.buy = buy;
        vm.sell = sell;
        vm.showModal = showModal;
        vm.select = select;
        vm.callUser = callUser;
        vm.showImage = showImage;
        vm.closeModal = closeModal;
        vm.section = $stateParams.section;

        vm.items = [
            {
                number: '+380957542354',
                img: 'fa-shopping-cart',
                name: 'Юлія',
                surname: 'Кириченко',
                text: 'Вже давно відомо, що читабельний зміст буде заважати зосередитись людині, яка ',
                images: ['https://pbs.twimg.com/media/CsYj-SQXgAAA-FS.jpg', 'https://pbs.twimg.com/media/CsYj-SQXgAAA-FS.jpg', 'http://www.chernihiv-oblast.gov.ua/media/upload/78-300x197.jpg'],
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
            vm.showModal('#продам');
        }

        function buy() {
            vm.showModal('#куплю');
        }

        function showModal(title) {
            vm.alertPopup = $ionicPopup.show({
                templateUrl: 'views/order_list/tags.popup.html',
                title: title,
                cssClass: 'order-tags-popup',
                scope: $scope,
                buttons: []
            });
            vm.orderType = title;

            IonicClosePopupService.register(vm.alertPopup);
        }

        function select(name) {
            console.log(name);
            vm.alertPopup.close();
            $state.go('app.order_add', {
                section: vm.section,
                type: vm.orderType,
                tag: name
            });
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


        function showImage(images) {
            $ionicModal.fromTemplateUrl('views/order_list/image_popover/image.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                vm.modalImage = modal;
                vm.modalImage.images = images;
                vm.modalImage.show();
            });
        }

        function closeModal() {
            vm.modalImage.hide();
        }

    }
})();
