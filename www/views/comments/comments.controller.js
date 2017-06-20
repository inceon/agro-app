/**
 * Controller for create/read comment item in the list of news
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Comments', Comments);

    Comments.$inject = ['$rootScope', '$state', '$stateParams', 'user', 'offers', 'comments'];

    function Comments($rootScope, $state, $stateParams, user, offers, comments) {
        var vm = this;

        vm.addComment = addComment;

        offers.one($stateParams.id)
            .then(function (res) {
                vm.comments = res.comments;
            });

        function addComment() {
            if(user.checkProfileComplete()) {
                comments.add({
                    kind: 'Offer',
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
