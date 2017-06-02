/**
 * Module for connect services
 */
(function () {
    'use strict';
    angular
        .module('services.module', [
            'model.user',
            'model.news',
            'model.recommend',
            'model.categories',
            'model.offers',
            'model.files',
            'model.bookmark',
            'model.services'
        ])
})();

