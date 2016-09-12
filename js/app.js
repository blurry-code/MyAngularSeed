//'use strict';
// 

angular.module('app',['ui.router','app.controllers','app.services','app.directives','Authentication'])
.run(function($rootScope, $state){
    $rootScope.version = "0.1.0";
})

.config(function (authenticationProvider) {
    // define here public states accessable without login
    var exceptions = ['impressum','about'];
    authenticationProvider.setExceptions(exceptions);
})
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        })
         .state('login', {
            url: '/login',
            templateUrl: 'modules/authentication/authentication.html',
            controller: 'LoginController'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'templates/about.html'
        })
        .state('history', {
            url: '/history',
            templateUrl: 'templates/history.html'
        })
        .state('impressum', {
            url: '/impressum',
            templateUrl: 'templates/impressum.html'
        });
});