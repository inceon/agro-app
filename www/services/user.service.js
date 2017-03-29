/**
 * User model
 */
(function() {
    'use strict';

    angular
        .module('model.user', [])
        .service('user', user);

    user.$inject = ['http', 'url', '$rootScope', '$sessionStorage', '$state', '$localStorage', '$ionicPopup', 'IonicClosePopupService'];

    function user(http, url, $rootScope, $sessionStorage, $state, $localStorage, $ionicPopup, IonicClosePopupService) {

        return {
            logout: logout,
            checkProfileComplete: checkProfileComplete
        };

        /**
         * Function for logout user
         */
        function logout() {
            delete $rootScope.user;
            delete $sessionStorage.auth_key;
            delete $localStorage.auth_key;
        }

        /**
         * Function for checking user profile complete
         */
        function checkProfileComplete() {
            if (true) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Інформація користувача',
                    template: 'Будь-ласка заповніть інформацію про Вас',
                    cssClass: 'checkProfileComplete',
                    buttons: [{
                        text: 'Відмінити'
                    }, {
                        text: '<b>Профіль</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            $state.go('app.profile');
                        }
                    }]
                });

                confirmPopup.then(function(res) {
                    if (res) {
                        return true;
                    } else {
                        return false;
                    }
                });
                IonicClosePopupService.register(confirmPopup);

                return false;
            } else {
                return true;
            }
        }
    }
})();