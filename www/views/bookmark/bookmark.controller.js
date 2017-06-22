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

        function callUser(author) {
            var $scope = $rootScope.$new();
            $scope.author = author;
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
