(function () {
    "use strict";

    angular
        .module('app')
        .controller('Recommend', Recommend);

    Recommend.$inject = ['$rootScope', '$scope', '$ionicModal', 'recommend', 'user'];

    function Recommend($rootScope, $scope, $ionicModal, recommend, user) {

        var vm = this;
        vm.add = add;

        recommend.all()
            .then(function (res) {
                vm.items = res;
            });

        $ionicModal.fromTemplateUrl('views/recommend/add_recommend.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            vm.modal = modal;
        });

        function add() {
            if (user.checkProfileComplete(vm.modal)) {
                recommend.add(vm.data)
                    .then(function (res) {
                        vm.items.push(res);

                        vm.data.text = ' ';
                        vm.modal.hide();
                    });
            }
        }
    }
})();
