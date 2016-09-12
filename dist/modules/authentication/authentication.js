'use strict';
 
angular.module('Authentication', [
    'ngCookies'
])
.provider('authentication', function ProvideAuthentication() {
    var exceptions = ['impressum', 'about'];
    
    return({
        getExceptions: getExceptions,
        setExceptions: setExceptions,
        $get: instantiateAuthentication
    });
    function getExceptions() {
        return(exceptions);
    }
    function setExceptions( newExceptions ) {
        testExceptions( newExceptions );
        exceptions = newExceptions;
    }
    function testExceptions( newExceptions ) {
        if ( ! newExceptions ) {
            throw( new Error( "InvalidExceptions" ) );
        }
    }
    function instantiateAuthentication() {
        return({
            exceptions: function() {
                return exceptions;    
            }
        });
    }
})
.run(['$rootScope', '$location', '$cookieStore', '$http', '$state', 'authentication',
    function ($rootScope, $location, $cookies, $http, $state, authentication) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies['globals'] || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                var exceptions = authentication.exceptions();
                var idx = exceptions.indexOf($state.current.name);
                if (idx === -1) {
                    $state.go('login');
                    $location.path('/login');
                }
            }
        });
    }
]);