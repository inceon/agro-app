/**
 * Controller for create/read comment item in the list of news
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Chat', Chat);

    Chat.$inject = ['$scope', '$rootScope', '$timeout', '$state', '$stateParams', 'user', 'offers', 'chat'];

    function Chat($scope, $rootScope, $timeout, $state, $stateParams, user, offers, chat) {
        var vm = this;

        vm.addComment = addComment;
        var promise;

        chat.all()
            .then(function (res) {
                vm.comments = res;
                angular.forEach(vm.comments, function (comment) {
                    user.one(comment.user)
                        .then(function (res) {
                            comment.user = res[0];
                        })
                })
                
                promise = $timeout(update, 1000);   

            });

        function update() {
            console.log('update chat');
            vm.newComments = [];
            var maped = vm.comments.map(function (item) {
                return item.objectId;
            });
            chat.all()
                .then(function (res) {
                    angular.forEach(res, function (comment) {
                        if (maped.indexOf(comment.objectId) == -1) {
                            user.one(comment.user)
                                .then(function (res) {
                                    comment.user = res[0];
                                    vm.newComments.push(comment);
                                });
                        }
                    });
                    vm.comments = vm.comments.concat(vm.newComments);
                    promise = $timeout(update, 400);
                });
        }

        $scope.$on('$destroy',function(){
            if(promise)
                $timeout.cancel(promise);   
        });

        function addComment() {
            if(user.checkProfileComplete()) {
                chat.add({
                    user: $rootScope.user.objectId,
                    message: vm.user.comment
                })
                .then(function(res) {
                    vm.comments.push({
                        objectId: res.objectId,
                        user: $rootScope.user,
                        message: vm.user.comment,
                        date: new Date()
                    });
                    vm.user.comment = '';
                });
            }
        }
    }
})();
