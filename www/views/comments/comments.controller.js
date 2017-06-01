/**
 * Controller for create/read comment item in the list of news
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Comments', Comments);

    Comments.$inject = ['$rootScope', '$state', '$stateParams', 'user', 'offers'];

    function Comments($rootScope, $state, $stateParams, user, offers) {
        var vm = this;

        vm.addComment = addComment;

        offers.comments($stateParams.id)
            .then(function (res) {
                vm.comments = res;
                angular.forEach(vm.comments, function (comment) {
                    user.one(comment.user)
                        .then(function (res) {
                            comment.user = res[0];
                        })
                })
            });

        function addComment() {
            if(user.checkProfileComplete()) {
                vm.comments.push({
                    user: $rootScope.user,
                    text: vm.user.comment,
                    date: new Date()
                });
                vm.user.comment = '';
            }
        }
    }
})();
