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

        comments.get($stateParams.id)
            .then(function (res) {
                vm.comments = res;
            });

        function addComment() {
            if(user.checkProfileComplete()) {
                comments.add({
                    resource: $stateParams.id,
                    body: vm.user.comment
                })
                .then(function(res) {
                    vm.comments.push({
                        user: $rootScope.user,
                        text: vm.user.comment,
                        date: new Date()
                    });
                    vm.user.comment = '';
                });
            }
        }
    }
})();
