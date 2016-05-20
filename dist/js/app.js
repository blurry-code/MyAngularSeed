//'use strict';
// 

angular.module('app',['ui.router','app.controllers','app.services','app.directives'])
.run(function($rootScope, $state){
    
})
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'templates/main.html',
            controller: 'MainController'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'templates/about.html'
        });
});
angular.module('app.controllers',[])
.controller('MainController', function($scope){
   
});
angular.module('app.services',[])
.factory("myService",function(){
    return {
        service: function () {
            
        }
    } 
});
angular.module('app.directives',[])
.directive('myDirective', function() {
    return {
        restrict: 'E',
        scope: {
             
        },
        link: function(scope, element, attr) {
            
        },
        compile: function($element, attr) {
       
        }
    }
});