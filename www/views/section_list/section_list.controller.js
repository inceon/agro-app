(function () {
    "use strict";

    angular
        .module('app')
        .controller('SectionList', SectionList);

    SectionList.$inject = ['$rootScope', '$state', '$stateParams'];

    function SectionList($rootScope, $state, $stateParams) {

        var vm = this;
        vm.type = $stateParams.type;

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
