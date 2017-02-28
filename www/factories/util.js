(function () {
    'use strict';
    angular
        .module('factory.util', [])
        .factory('util', util);

    util.$inject = [];

    /**
     * Function for validation email, password and other
     */

    function util() {

        return {
            isValidPassword: isValidPassword,
            isValidEMail: isValidEMail,
            isValidDomain: isValidDomain,
            emptyItems: emptyItems,
            isValidCountSymbol: isValidCountSymbol
        };

        function isValidPassword(password) {
            return (password.length >= 6)
        }

        function isValidEMail(email) {
            var EMAIL_PATTERN = /^[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
            return !!email.match(EMAIL_PATTERN);
        }

        function isValidDomain(email) {
            var VALID_DOMAINS = [
                "gstt.nhs.uk",
                "nhs.net",
                "kcl.ac.uk",
                "propellerapp.co.uk",
                "selfless.org.uk",
                "gmail.com",
                "dersetcreative.co.uk",
                "dorsetcreative.co.uk"
            ];
            var index = email.indexOf('@');
            var domain = email.substring(index + 1, email.length);

            return VALID_DOMAINS.indexOf(domain) != -1;
        }

        function emptyItems(items) {
            var res = false;
            angular.forEach(items, function (item) {
                if(!item || typeof item == 'string' && item.trim().length == 0){
                    res = true;
                }
            });
            return res;
        }

        function isValidCountSymbol(field, count) {
            return field.length <= count;
        }
    }
})();
