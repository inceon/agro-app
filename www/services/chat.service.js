(function() {
    'use strict';

    angular
        .module('model.chat', [])
        .service('chat', chat);

    chat.$inject = ['http', 'url', '$sessionStorage', '$rootScope', 'toastr'];

    function chat(http, url, $sessionStorage, $rootScope, toastr) {

        var socket = io.connect('85.143.223.54:4000');

        return {
            connect: connect,
            get: get,
            add: add
        };

        function connect() {
            socket.emit('add user', $sessionStorage.auth_key);

            socket.on('new message', function (res) {
                console.log(res);
                $rootScope.$broadcast('new message', res);
            });

            socket.on('login', function (res) {
                console.log(res);
            });

            socket.on('error', function (res) {
                toastr.error(res);
            });
        }

        function get() {
            return http
                .get(url.chat.get)
                .then(function (res) {
                    return res;
                });
        }

        function add(data) {
            socket.emit('new message', data);
        }
    }
})();
