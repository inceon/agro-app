(function () {
    'use strict';
    angular
        .module('app')
        .config(mainConfig);

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicLoadingConfig', '$ionicConfigProvider', '$mdGestureProvider'];

    /**
     * Function for configurate angular app
     */
    function mainConfig($stateProvider, $urlRouterProvider, $ionicLoadingConfig, $ionicConfigProvider, $mdGestureProvider) {

        // $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.backButton.text('');
        $ionicConfigProvider.views.swipeBackEnabled(false);
        $mdGestureProvider.skipClickHijack();

        /**
         * Configuring ionic loader
         */
        angular.extend($ionicLoadingConfig, {
            noBackdrop: true
        });

        /**
         * Configuring state provider
         */
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login/login.html',
                controller: 'Login',
                controllerAs: 'vm'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/signup/signup.html',
                controller: 'Signup',
                controllerAs: 'vm'
            })
            .state('password', {
                url: '/password',
                templateUrl: 'views/reset_password/reset_password.html',
                controller: 'Password',
                controllerAs: 'vm'
            })
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'views/menu/menu.html',
                controller: 'AppCtrl',
                controllerAs: 'vm'
            })
            .state('app.main', {
                url: '/main',
                views: {
                    'menuContent': {
                        templateUrl: 'views/main/main.html',
                        controller: 'Main',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.section_list', {
                url: '/section_list',
                views: {
                    'menuContent': {
                        templateUrl: 'views/section_list/section_list.html',
                        controller: 'SectionList',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.news', {
                url: '/news',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'views/news/news.html',
                        controller: 'News',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.news_details', {
                url: '/news_details',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'views/news_details/news_details.html',
                        controller: 'NewsDetails',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.order_list', {
                url: '/order_list',
                views: {
                    'menuContent': {
                        templateUrl: 'views/order_list/order_list.html',
                        controller: 'OrderList',
                        controllerAs: 'vm'
                    }
                },
                params: {
                    section: null
                }
            })
            .state('app.google_map', {
                url: '/google_map',
                views: {
                    'menuContent': {
                        templateUrl: 'views/google_map/google_map.html',
                        controller: 'GoogleMap',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.comments', {
                url: '/comments',
                views: {
                    'menuContent': {
                        templateUrl: 'views/comments/comments.html',
                        controller: 'Comments',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.order_add', {
                url: '/order_add',
                views: {
                    'menuContent': {
                        templateUrl: 'views/order_add/order_add.html',
                        controller: 'OrderAdd',
                        controllerAs: 'vm'
                    }
                },
                params: {
                    type: null,
                    section: null,
                    tag: null
                }
            })
            .state('app.profile', {
                url: '/profile',
                views: {
                    'menuContent': {
                        templateUrl: 'views/profile/profile.html',
                        controller: 'Profile',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.user_rating', {
                url: '/user_rating',
                views: {
                    'menuContent': {
                        templateUrl: 'views/user_rating/user_rating.html',
                        controller: 'UserRating',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.recommend', {
                url: '/recommend',
                views: {
                    'menuContent': {
                        templateUrl: 'views/recommend/recommend.html',
                        controller: 'Recommend',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/main');
    }


})();

