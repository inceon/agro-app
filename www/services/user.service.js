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
            me: me,
            one: one,
            save: save,
            signup: signup,
            login: login,
            logout: logout,
            checkProfileComplete: checkProfileComplete
        };

        function me() {
            return http
                .get(url.users.me)
                .then(function (res) {
                    return res;
                });
        }

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
         * @param {string} data.name - user name
         * @param {string} data.surname - user surname
         * @param {string} data.photo - photo url
         */
        function save(data) {
            return http
                .put(url.users.update + $rootScope.user.id, data)
                .then(function (res) {
                    return res;
                })
        }

        /**
         *
         * @param {object} data
         * @param {string} data.username - phone number
         * @param {string} data.password - password
         */
        function signup(data) {
            return http
                .post(url.site.signup, data)
                .then(function (res) {
                    one(res.objectId)
                        .then(function (res) {
                            $rootScope.user = res.user;
                        });
                    $sessionStorage.auth_key = res.token;
                    $localStorage.auth_key = res.token;
                    return res;
                });
        }

        /**
         * [login description]
         * @param  {[object]} data [description]
         * @param  {[object.phone]} data [description]
         * @param  {[object.password]} data [description]
         */
        function login(data) {
            return http
                .post(url.site.login, data)
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
        function checkProfileComplete(modal) {
            if (!$rootScope.user.name || !$rootScope.user.surname || !$rootScope.user.photo) {
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
                            if (modal) {
                                modal.hide();
                            }
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
            }

            return true;
        }
    }
})();
