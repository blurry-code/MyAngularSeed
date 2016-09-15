'use strict';
  

//// declare modules
angular.module('Authentication')
  
.controller('LoginController',
    function ($scope, $rootScope, $location, AuthenticationService) {
        $rootScope.auth_logout = function() {
            // reset login status
            AuthenticationService.ClearCredentials();
        }
  
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success && response.success != "null") {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/home');
                } else {
                    $scope.error = response.message;
                    AuthenticationService.ClearCredentials();
                    $scope.dataLoading = false;
                }
            });
        };
    });