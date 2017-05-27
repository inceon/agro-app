(function () {
    "use strict";

    angular
        .module('app')
        .controller('SectionList', SectionList);

    SectionList.$inject = ['$rootScope', '$state', '$stateParams', 'categories'];

    function SectionList($rootScope, $state, $stateParams, categories) {

        var vm = this;
        vm.type = $stateParams.type;

        categories.all()
            .then(function (res) {
                vm.items = res;
                angular.forEach(vm.items, function (category) {
                    categories.subcategories(category.objectId)
                        .then(function (res) {
                            category.subcategories = res;
                        })
                })
            });

    }
})();
