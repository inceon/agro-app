/**
 * Controller for create/read comment item in the list of news
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('Comments', Comments);

    Comments.$inject = ['$rootScope', '$state'];

    function Comments($rootScope, $state) {
        var vm = this;
        vm.user = {
            avatar: 'img/cm_5Wvf1VuE.jpg',
            comment: ''
        };
        vm.addComment = addComment;

        vm.comments = [
            {
                img: 'img/cm_5Wvf1VuE.jpg',
                user: 'Колобок Свиридон',
                text: 'Продаем на экспорт - пшеницу, мясо, людей 3го сорта, фураж и другие зерновые. Продаем на экспорт - пшеницу, мясо, людей 3го сорта, фураж и другие зерновые',
                date: new Date()
            },
            {
                img: 'img/cm_5Wvf1VuE.jpg',
                user: 'Колобок Свиридон',
                text: 'Продаем на экспорт - пшеницу, мясо, людей 3го сорта, фураж и другие зерновые',
                date: new Date()
            }
        ];

        function addComment() {
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
