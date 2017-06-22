/**
 * Controller for viewing a news details
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('NewsDetails', NewsDetails);

    NewsDetails.$inject = ['$rootScope', '$state', '$stateParams', 'news'];

    function NewsDetails($rootScope, $state, $stateParams, news) {
        var vm = this;

        console.log($stateParams);

        news.one($stateParams.id)
            .then(function (res) {
                vm.data = res;
            });

    }
})();
