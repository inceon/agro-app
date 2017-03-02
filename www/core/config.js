(function () {
    'use strict';
    angular
        .module('app')
        .config(mainConfig);

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicLoadingConfig', '$ionicConfigProvider'];

    /**
     * Function for configurate angular app
     */
    function mainConfig($stateProvider, $urlRouterProvider, $ionicLoadingConfig, $ionicConfigProvider) {

        // $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.backButton.text('Back');
        $ionicConfigProvider.views.swipeBackEnabled(false);

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
            .state('app.buy', {
                url: '/buy',
                views: {
                    'menuContent': {
                        templateUrl: 'views/buy/buy.html',
                        controller: 'Buy',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/main');
    }


})();

