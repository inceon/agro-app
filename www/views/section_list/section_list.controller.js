(function () {
    "use strict";

    angular
        .module('app')
        .controller('SectionList', SectionList);

    SectionList.$inject = ['$rootScope', '$state'];

    function SectionList($rootScope, $state) {

        var vm = this;

        vm.items = [
            {
                icon: 'fa-shopping-cart',
                name: 'Зернові',
                hashtags: ['#пшениця', '#просо', '#ячмінь', '#рис', '#пшениця', '#просо', '#ячмінь', '#рис', '#пшениця', '#просо', '#ячмінь', '#рис']
            },
            {
                icon: 'fa-arrows',
                name: 'Тваринництво',
                hashtags: ['#пшениця', '#просо', '#ячмінь', '#рис']
            },
            {
                icon: 'fa-bolt',
                name: 'Корм для тварин',
                hashtags: ['#пшениця', '#просо', '#ячмінь', '#рис']
            }
        ];

    }
})();
