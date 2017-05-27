(function() {
    'use strict';

    angular
        .module('filter.replaceSpace', [])
        .filter('replaceSpace', replaceSpace);

    replaceSpace.$inject = [];

    function replaceSpace() {
        return function (input, to) {
            input = input || '';
            to = to || '';
            return input.replace(new RegExp(' ', 'g'), to);
        };
    }
})();
