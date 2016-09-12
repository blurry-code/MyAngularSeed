angular.module('app.controllers',[])
.controller('NavController', function($scope, $location, $state, $rootScope){
    $rootScope.$state = $state;
    $scope.loggedIn = false;
    $scope.$watch(function() {
        
    }, function(newValue, oldValue) {
       $scope.loggedIn = newValue;
    });
    
    
    $scope.isActive = function(route) {
        var x = $location.path();
        var y = x.indexOf(route);
        return y >= 0
    };
})
.controller('HomeController', function($scope){

});