(function () {
    'use strict';
    angular
        .module('factory.request', [])
        .factory('http', ['$http', '$rootScope', '$sessionStorage', '$localStorage', '$q', 'back4app', 'toastr', 'Upload', http]);

    function http($http, $rootScope, $sessionStorage, $localStorage, $q, back4app, toastr, Upload) {

        return {
            get: function (url, data) {
                return request('GET', url, data);
            },
            post: function (url, data) {
                return request('POST', url, data);
            },
            put: function (url, data) {
                return request('PUT', url, data);
            },
            delete: function (url, data) {
                return request('DELETE', url, data);
            },
            file: function (url, data) {
                return requestFile(url, data);
            }
        };


        /**
         * Main request function
         * @param {string} method - Method name
         * @param {string} url - Request url
         * @param {object} data - Data to request
         * @returns {promise}
         */
        function request(method, url, data) {

            var config = {
                dataType: 'json',
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            };

            if (method === 'GET') {
                config.params = data;
                config.timeout = 20000;
            }
            else {
                config.data = data;
            }

            if ($sessionStorage.auth_key) {
                url += '?auth_token='+$sessionStorage.auth_key;
            }
            config.url = url;

            return $http(config)
                .then(requestComplete)
                .catch(requestFailed);
        }

        /**
         * Callback function for failed request
         * @param err
         * @returns {promise}
         */
        function requestFailed(err) {
            console.info('error', err.config.url, err);

            if (err.data == null || !err.data.error) {
                if (err.status === 200) {
                    toastr.error('Server error: ' + err.data);
                }
                else if (err.status === -1) {
                    toastr.error('Server is not available');
                }
                else if (err.status === 0) {
                    toastr.error('There is no Internet connection');
                }
                else if (err.status === 500) {
                    toastr.error('Server error: ' + err.status + ' ' + err.data.message);
                }
                else {
                    toastr.error('Server error: ' + err.status + ' ' + err.statusText);
                }
                // console.log('XHR Failed: ' + err.status);
            } else {
                console.log(err);
                if (err.data.code === 209 || err.data.error === "unauthorized") {
                    delete $rootScope.user;
                    delete $sessionStorage.auth_key;
                    delete $localStorage.auth_key;
                } else {
                    toastr.error(err.data.error.message);
                }
            }

            return $q.reject(err.data.error);
        }

        /**
         * Callback function for success request
         * @param response
         * @returns {promise}
         */
        function requestComplete(response) {
            var promise = $q.defer();

            console.info('response complete', response.config.url, response);

            if (!response.data.error) {
                promise.resolve(response.data);
            }
            else {
                promise.reject(response);
            }

            return promise.promise;
        }

        /**
         * Function for sending files
         * @param {string} url - Request url
         * @param {object} data - Data to request
         * @returns {promise}
         */
        function requestFile(url, files) {
            if ($sessionStorage.auth_key) {
                url += '?auth_token='+$sessionStorage.auth_key;
            }
            return Upload.upload({
                url: url,
                data: files
            });
        }
    }
}());
