(function () {
    "use strict";

    angular
        .module('app')
        .controller('Bookmark', Bookmark);

    Bookmark.$inject = ['$q', '$rootScope', '$scope', '$ionicPopup', 'IonicClosePopupService', '$ionicModal', '$ionicSlideBoxDelegate', 'offers', 'bookmark', 'user', 'categories'];

    function Bookmark($q, $rootScope, $scope, $ionicPopup, IonicClosePopupService, $ionicModal, $ionicSlideBoxDelegate, offers, bookmark, user, categories) {


        var vm = this;
        vm.changeBookmark = changeBookmark;
        vm.callUser = callUser;
        vm.showImage = showImage;
        vm.closeModal = closeModal;
        vm.allItems = [];
        vm.next = next;
        vm.previous = previous;

        vm.items = [];
        vm.hashtags = [];
        bookmark.all()
            .then(function (res) {
                var prom = [];

                angular.forEach(res, function (item) {
                    prom.push(offers.one(item.offer)
                                    .then(function (res) {
                                        res[0].bookmarkId = item.objectId;
                                        return vm.items.push(res[0]);
                                    }));
                });
                $q.all(prom).then(function () {
                    console.log(vm.items);
                    getAdditionalInfo();
                });
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

                item.bookmark = true;
            });
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
