/**
 * Controller for processing a news list
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('News', News);

    News.$inject = ['$rootScope', '$state', 'news'];

    function News($rootScope, $state, news) {
        var vm = this;

        news.all()
            .then(function (res) {
                console.log(res);
                vm.list = res;
            })

    }
})();
