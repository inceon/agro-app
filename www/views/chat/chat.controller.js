/**
 * Controller for create/read comment item in the list of news
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Chat', Chat);

    Chat.$inject = ['$scope', '$rootScope', '$timeout', '$state', '$stateParams', 'chat'];

    function Chat($scope, $rootScope, $timeout, $state, $stateParams, chat) {
        var vm = this;

        vm.addComment = addComment;

        vm.comments = [];

        chat.get()
            .then(function (res) {
                vm.comments = res;
            });

        chat.connect();

        function addComment() {
            chat.add(vm.user.comment);
            vm.user.comment = null;
        }

        $rootScope.$on('new message', function (event, data) {
            vm.comments.push(data.message);
            $scope.$apply();
        });
    }
})();
