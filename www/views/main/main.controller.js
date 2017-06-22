(function () {
    "use strict";

    angular
        .module('app')
        .controller('Main', Main);

    Main.$inject = ['$rootScope', '$state', '$ionicHistory', 'site'];

    function Main($rootScope, $state, $ionicHistory, site) {

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

        site.count()
            .then(function (res) {
                console.log(res);
                vm.colNews = res.news + num2str(res.news, [' новина', ' новини', ' новин']);
                vm.colBuy = res.buy + num2str(res.buy, [' оголошення', ' оголошення', ' оголошень']);
                vm.colSell = res.sell + num2str(res.sell, [' оголошення', ' оголошення', ' оголошень']);
                vm.colServices = res.services + num2str(res.services, [' послуга', ' послуги', ' послуг']);
                // vm.colChat = res + num2str(res, [' повідомлення', ' повідомлення', ' повідомлень']);
            });

    }
})();
