(function () {
    "use strict";

    angular
        .module('app')
        .controller('offerList', offerList);

    offerList.$inject = ['$state', '$scope', '$ionicPopup', 'IonicClosePopupService', '$ionicModal', '$stateParams', '$rootScope', '$ionicSlideBoxDelegate', 'offers', 'categories', 'user', 'bookmark'];

    function offerList($state, $scope, $ionicPopup, IonicClosePopupService, $ionicModal, $stateParams, $rootScope, $ionicSlideBoxDelegate, offers, categories, user, bookmark) {

        console.log($stateParams.city);

        var vm = this;
        vm.buy = buy;
        vm.sell = sell;
        vm.showModal = showModal;
        vm.changeBookmark = changeBookmark;
        vm.select = select;
        vm.filter = filter;
        vm.callUser = callUser;
        vm.showImage = showImage;
        vm.closeModal = closeModal;
        vm.type = $stateParams.type;
        vm.section = $stateParams.section;
        vm.tag = $stateParams.tag;
        vm.city = $rootScope.filter?$rootScope.filter.city:0;
        vm.allItems = [];
        vm.next = next;
        vm.previous = previous;

        bookmark.all()
            .then(function (res) {
                vm.bookmarks = res;
            });

        if(vm.tag) {
            offers.allInSubCategory(vm.tag.objectId, vm.type)
                .then(function (res) {
                    vm.items = res;
                    getAdditionalInfo();
                });
        } else {
            offers.allInCategory(vm.section.objectId, vm.type)
                .then(function (res) {
                    vm.items = res;
                    getAdditionalInfo();
                });
        }

        categories.subcategories(vm.section.objectId)
            .then(function (res) {
                vm.hashtags = res;
            });

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

                angular.forEach(vm.hashtags, function (hashtag) {
                    if (item.subcategory === hashtag.objectId) {
                        item.subcategory = hashtag;
                    }
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

        function sell() {
            vm.showModal('sell');
        }

        function buy() {
            vm.showModal('buy');
        }

        function showModal(title) {
            vm.alertPopup = $ionicPopup.show({
                templateUrl: 'views/offer_list/tags.popup.html',
                title: title=='buy'?'Купити':'Продати',
                cssClass: 'offer-tags-popup',
                scope: $scope,
                buttons: []
            });
            vm.offerType = title;

            IonicClosePopupService.register(vm.alertPopup);
        }

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

        function select(tag) {
            console.log(tag);
            vm.alertPopup.close();
            $state.go('app.offer_add', {
                section: vm.section,
                type: vm.offerType,
                tag: tag
            });
        }

        function filter(hashtag) {
            if (!vm.allItems.length) {
                angular.copy(vm.items, vm.allItems);
            }
            if (vm.tag === hashtag) {
                vm.tag = null;
                angular.copy(vm.allItems, vm.items);
            } else {
                vm.items = vm.allItems.filter(function (item) {
                    return item.subcategory.objectId === hashtag.objectId;
                });
                vm.tag = hashtag;
            }
        }

        function callUser(user) {
            var $scope = $rootScope.$new();
            $scope.user = user;
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
