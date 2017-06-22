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
            'model.rating',
            'model.files',
            'model.bookmark',
            'model.services',
            'model.comments',
            'model.chat',
            'model.site'
        ])
})();

