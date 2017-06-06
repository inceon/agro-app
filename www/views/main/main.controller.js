(function () {
    "use strict";

    angular
        .module('app')
        .controller('Main', Main);

    Main.$inject = ['$rootScope', '$state', '$ionicHistory', 'user', 'news', 'offers', 'services', 'chat'];

    function Main($rootScope, $state, $ionicHistory, user, news, offers, services, chat) {

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

        news.col()
            .then(function (res) {
                vm.colNews = res + num2str(res, [' новина', ' новини', ' новин']);
            });

        offers.col('buy')
            .then(function (res) {
                vm.colBuy = res + num2str(res, [' оголошення', ' оголошення', ' оголошень']);
            });

        offers.col('sell')
            .then(function (res) {
                vm.colSell = res + num2str(res, [' оголошення', ' оголошення', ' оголошень']);
            });

        services.col()
            .then(function (res) {
                vm.colServices = res + num2str(res, [' послуга', ' послуги', ' послуг']);
            });

        chat.col()
            .then(function (res) {
                vm.colChat = res + num2str(res, [' повідомлення', ' повідомлення', ' повідомлень']);
            });
    }
})();
