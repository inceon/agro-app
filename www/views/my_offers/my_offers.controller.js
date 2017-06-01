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
        vm.callUser = callUser;
        vm.showImage = showImage;
        vm.closeModal = closeModal;
        vm.allItems = [];
        vm.next = next;
        vm.previous = previous;

        vm.items = [];

        bookmark.all()
            .then(function (res) {
                vm.bookmarks = res;
            });

        offers.my()
            .then(function (res) {
                vm.items = res;
                getAdditionalInfo();
            });

        function changeBookmark(item) {
            item.bookmark = !item.bookmark;
            if(item.bookmark) {
                bookmark.add({
                    user: $rootScope.user.objectId,
                    offer: item.objectId
                });
            } else {
                bookmark.remove(item.bookmarkId);
            }
        }

        function getAdditionalInfo() {
            angular.forEach(vm.items, function (item) {
                user.one(item.user)
                    .then(function (res) {
                        item.user = res[0];
                    });

                offers.images(item.objectId)
                    .then(function (res) {
                        item.images = res;
                    });

                categories.one(item.category)
                    .then(function (res) {
                        item.section = res[0];
                    });

                item.bookmark = false;

                angular.forEach(vm.bookmarks, function (bookmark) {
                    if(bookmark.offer === item.objectId) {
                        item.bookmark = true;
                        item.bookmarkId = bookmark.objectId;
                    }
                });
            });
        }

        function deleteMyOffer(item) {
            vm.deleteDialog = $ionicPopup.confirm({
                title: 'Видалити заявку',
                template: 'Ви впевнені?',
                cancelText: 'Відмінити',
                okText: 'Видалити'
            }).then(function (res) {
                if(res) {
                    offers.remove(item.objectId)
                        .then(function (res) {
                            var removeIndex = vm.items.map(function(item) { return item.objectId; })
                                .indexOf(item.objectId);

                            ~removeIndex && vm.items.splice(removeIndex, 1);
                        });
                }
            });

            IonicClosePopupService.register(vm.deleteDialog);
        }

        function callUser(number) {
            vm.callDialog = $ionicPopup.show({
                templateUrl: 'views/offer_list/call.popup.html',
                scope: $scope,
                cssClass: 'call-popup',
                buttons: []
            });

            IonicClosePopupService.register(vm.callDialog);
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
