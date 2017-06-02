(function () {
    'use strict';
    angular
        .module('app')
        .config(mainConfig);

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'toastrConfig', '$ionicLoadingConfig', '$ionicConfigProvider', '$mdGestureProvider'];

    /**
     * Function for configurate angular app
     */
    function mainConfig($stateProvider, $urlRouterProvider, toastrConfig, $ionicLoadingConfig, $ionicConfigProvider, $mdGestureProvider) {

        // $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.backButton.text('');
        $ionicConfigProvider.views.swipeBackEnabled(false);
        $mdGestureProvider.skipClickHijack();

        angular.extend(toastrConfig, {
            debug: false,
            newestOnTop: true,
            positionClass: "toast-top-full-width",
            preventOpenDuplicates: true,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        });

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
                },
                params: {
                    type: null
                }
            })
            .state('app.news', {
                url: '/news',
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
                views: {
                    'menuContent': {
                        templateUrl: 'views/news_details/news_details.html',
                        controller: 'NewsDetails',
                        controllerAs: 'vm'
                    }
                },
                params: {
                    id: null
                }
            })
            .state('app.offer_list', {
                url: '/offer_list',
                views: {
                    'menuContent': {
                        templateUrl: 'views/offer_list/offer_list.html',
                        controller: 'offerList',
                        controllerAs: 'vm'
                    }
                },
                params: {
                    type: null,
                    section: null,
                    tag: null,
                    city: null
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
                },
                params: {
                    type: null,
                    section: null,
                    tag: null,
                    city: null
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
                },
                params: {
                    id: null
                }
            })
            .state('app.offer_add', {
                url: '/offer_add',
                views: {
                    'menuContent': {
                        templateUrl: 'views/offer_add/offer_add.html',
                        controller: 'offerAdd',
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
            .state('app.services', {
                url: '/services',
                views: {
                    'menuContent': {
                        templateUrl: 'views/services/services.html',
                        controller: 'Services',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.bookmark', {
                url: '/bookmark',
                views: {
                    'menuContent': {
                        templateUrl: 'views/bookmark/bookmark.html',
                        controller: 'Bookmark',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.my_offers', {
                url: '/my_offers',
                views: {
                    'menuContent': {
                        templateUrl: 'views/my_offers/my_offers.html',
                        controller: 'MyOffers',
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

        $urlRouterProvider.otherwise('/login');
    }


})();

