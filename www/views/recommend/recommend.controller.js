(function () {
    "use strict";

    angular
        .module('app')
        .controller('Recommend', Recommend);

    Recommend.$inject = ['$rootScope', '$scope', '$ionicModal'];

    function Recommend($rootScope, $scope, $ionicModal) {

        var vm = this;
        vm.add = add;

        vm.items = [
            {
                img: 'fa-shopping-cart',
                name: 'Юлія',
                surname: 'Кириченко',
                text: 'Вже давно відомо, що читабельний зміст буде заважати зосередитись людині, яка ',
                date: '02.15.1992'
            },
            {
                img: 'fa-arrows',
                name: 'Юлія',
                surname: 'Кириченко',
                text: 'Вже давно відомо, що читабельний зміст буде заважати зосередитись людині, яка оцінює композицію сторінки. Сенс використання Lorem Ipsum полягає в тому, що цей текст має більш-менш нормальне розподілення літер на відміну від, наприклад, "Тут іде текст. Тут іде текст."',
                date: '02.15.1992'
            },
            {
                img: 'fa-bolt',
                name: 'Юлія',
                surname: 'Кириченко',
                text: 'Вже давно відомо, що читабельний зміст буде заважати зосередитись ',
                date: '02.15.1992'
            }
        ];

        $ionicModal.fromTemplateUrl('views/recommend/add_recommend.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            vm.modal = modal;
        });

        function add() {
            vm.items.push({
                name: 'Юлія',
                surname: 'Кириченко',
                text: vm.data.text,
                date: '02.15.1992'
            });
            vm.data.text = ' ';
            vm.modal.hide();
        }
    }
})();
