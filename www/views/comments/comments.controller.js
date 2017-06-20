/**
 * Controller for create/read comment item in the list of news
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Comments', Comments);

    Comments.$inject = ['$rootScope', '$state', '$stateParams', 'user', 'offers', 'comments', 'services'];

    function Comments($rootScope, $state, $stateParams, user, offers, comments, services) {
        var vm = this;

        vm.addComment = addComment;
        vm.source = $stateParams.source;

        if (vm.source === 'Offer') {
            offers.one($stateParams.id)
                .then(function (res) {
                    vm.comments = res.comments;
                });
        } else if (vm.source === 'Service') {
            services.one($stateParams.id)
                .then(function (res) {
                    vm.comments = res.comments;
                });
        }

        function addComment() {
            if(user.checkProfileComplete()) {
                comments.add({
                    kind: vm.source,
                    resource: $stateParams.id,
                    body: vm.user.comment
                })
                .then(function(res) {
                    vm.comments.push({
                        author: $rootScope.user,
                        body: vm.user.comment,
                        created_at: new Date()
                    });
                    vm.user.comment = '';
                });
            }
        }
    }
})();
