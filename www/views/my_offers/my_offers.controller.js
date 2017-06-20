(function () {
    "use strict";

    angular
        .module('app')
        .controller('MyOffers', MyOffers);

    MyOffers.$inject = ['$rootScope', '$scope', '$ionicPopup', 'IonicClosePopupService', '$ionicModal', '$ionicSlideBoxDelegate', 'offers', 'bookmark', 'user', 'categories'];

    function MyOffers($rootScope, $scope, $ionicPopup, IonicClosePopupService, $ionicModal, $ionicSlideBoxDelegate, offers, bookmark, user, categories) {


        var vm = this;
        vm.changeBookmark = changeBookmark;
        vm.deleteMyOffer = deleteMyOffer;
        vm.showImage = showImage;
        vm.closeModal = closeModal;
        vm.allItems = [];
        vm.next = next;
        vm.previous = previous;

        vm.items = [];

        offers.my()
            .then(function (res) {
                vm.items = res;
            });

        function changeBookmark(item) {
            item.bookmark = !item.bookmark;
            if(item.bookmark) {
                bookmark.add(item.id);
            } else {
                bookmark.remove(item.id);
            }
        }

        function deleteMyOffer(item) {
            vm.deleteDialog = $ionicPopup.confirm({
                title: 'Видалити заявку',
                template: 'Ви впевнені?',
                cancelText: 'Відмінити',
                okText: 'Видалити'
            }).then(function (res) {
                if(res) {
                    offers.remove(item.id)
                        .then(function (res) {
                            var removeIndex = vm.items.map(function(item) { return item.id; })
                                .indexOf(item.id);

                            ~removeIndex && vm.items.splice(removeIndex, 1);
                        });
                }
            });

            IonicClosePopupService.register(vm.deleteDialog);
        }

        function showImage(images) {
            $ionicModal.fromTemplateUrl('views/offer_list/image_popover/image.html', {
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
