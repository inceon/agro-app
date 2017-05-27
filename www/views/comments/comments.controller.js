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

        //TODO current user info

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

        // vm.comments = [
        //     {
        //         img: 'img/cm_5Wvf1VuE.jpg',
        //         user: 'Колобок Свиридон',
        //         text: 'Продаем на экспорт - пшеницу, мясо, людей 3го сорта, фураж и другие зерновые. Продаем на экспорт - пшеницу, мясо, людей 3го сорта, фураж и другие зерновые',
        //         date: new Date()
        //     },
        //     {
        //         img: 'img/cm_5Wvf1VuE.jpg',
        //         user: 'Колобок Свиридон',
        //         text: 'Продаем на экспорт - пшеницу, мясо, людей 3го сорта, фураж и другие зерновые',
        //         date: new Date()
        //     }
        // ];

        function addComment() {
            if(user.checkProfileComplete()) {
                vm.comments.push({
                    img: vm.user.avatar,
                    user: 'Юля Кириченко',
                    text: vm.user.comment,
                    date: new Date()
                });
                vm.user.comment = '';
            }

            vm.comments.push({
                    img: vm.user.avatar,
                    user: 'Юля Кириченко',
                    text: vm.user.comment,
                    date: new Date()
                });
            vm.user.comment = '';
        }
    }
})();
