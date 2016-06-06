'use strict'
hereApp.config(["$stateProvider", "$urlRouterProvider", "$locationProvider",
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        //default route
        $urlRouterProvider.otherwise("/");
        //html5 mode
        /*$locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });*/
        //configure routes
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login/login.html',
                controller: 'loginController'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'partials/register/register.html',
                controller: 'registerController'
            })
            .state('home', {
                url: '/',
                templateUrl: 'partials/home/home.html',
                controller: 'homeController'
            })
            .state('search', {
                url: '/search',
                templateUrl: 'partials/search/search.html',
                controller: 'searchController'
            })
            .state('searchResult', {
                url: '/searchResult',
                templateUrl: 'partials/searchResult/searchResult.html',
                controller: 'searchResultController',
                params: {type:null, name: null}
            })
            .state('details', {
                url: '/details',
                templateUrl: 'partials/details/details.html',
                controller: 'detailsController',
                params: {placeID:null}
            })
            .state('invite', {
                url: '/invite',
                templateUrl: 'partials/invite/invite.html',
                controller: 'inviteController'
            })
    }
]);
