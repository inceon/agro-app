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
            one: one,
            signup: signup,
            login: login,
            logout: logout,
            checkProfileComplete: checkProfileComplete
        };

        function one(userId) {
            return http
                .get(url.user, {
                    where: {
                        "objectId": userId
                    }
                })
                .then(function (res) {
                    return res.results;
                });
        }

        /**
         *
         * @param {object} data
         * @param {string} data.username - phone number
         * @param {string} data.password - password
         */
        function signup(data) {
            return http
                .post(url.user, data)
                .then(function (res) {
                    one(res.objectId)
                        .then(function (res) {
                            $rootScope.user = res;
                        });
                    $sessionStorage.auth_key = res.sessionToken;
                    $localStorage.auth_key = res.sessionToken;
                    return res;
                });
        }

        function login(data) {
            return http
                .get(url.user + '/login', data)
                .then(function (res) {
                    return res;
                })
        }

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
