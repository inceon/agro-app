(function () {
    "use strict";

    angular
        .module('app')
        .controller('Services', Services);

    Services.$inject = ['$state', '$scope', '$ionicPopup', 'IonicClosePopupService', '$ionicModal', '$stateParams', '$rootScope', '$ionicSlideBoxDelegate', 'offers', 'categories', 'user', 'services'];

    function Services($state, $scope, $ionicPopup, IonicClosePopupService, $ionicModal, $stateParams, $rootScope, $ionicSlideBoxDelegate, offers, categories, user, services) {

        var vm = this;
        vm.callUser = callUser;
        vm.showImage = showImage;
        vm.closeModal = closeModal;
        vm.next = next;
        vm.previous = previous;

        services.all()
            .then(function (res) {
                vm.items = res;
                getAdditionalInfo();
            });


        function getAdditionalInfo() {
            angular.forEach(vm.items, function (item) {
                user.one(item.user)
                    .then(function (res) {
                        item.user = res[0];
                    });

                services.images(item.objectId)
                    .then(function (res) {
                        item.images = res;
                    });
            });
        }

        function callUser(user) {
            var $scope = $rootScope.$new();
            $scope.user = user;
            vm.callDialog = $ionicPopup.show({
                templateUrl: 'views/services/call.popup.html',
                scope: $scope,
                cssClass: 'call-popup',
                buttons: []
            });

            IonicClosePopupService.register(vm.callDialog);
        }


        function showImage(images) {
            $ionicModal.fromTemplateUrl('views/services/image_popover/image.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                vm.modalImage = modal;
                vm.modalImage.images = images;
                vm.modalImage.show();
            });
        }

        function closeModal() {
            vm.modalImage.hide();
        }

        function next() {
            $ionicSlideBoxDelegate.next();
        }

        function previous() {
            $ionicSlideBoxDelegate.previous();
        }
    }
})();
