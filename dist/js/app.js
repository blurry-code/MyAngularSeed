//'use strict';
// 

angular.module('app',['ui.router','app.controllers','app.services','app.directives','Authentication','ngSanitize'])
.run(function($rootScope, $state){
    $rootScope.version = "0.2.0";
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
        .state('bulletin', {
            url: '/bulletin',
            templateUrl: 'templates/bulletin.html',
            controller: 'BulletinController'
        })
        .state('bulletin_entry', {
            url: '/bulletin/entry',
            templateUrl: 'templates/bulletin_entry.html',
            controller: 'BulletinEntryController',
            params: {content:null}
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
.controller('BulletinController', function($scope, projects){
    $scope.content = [];
    $scope.entries = [
      {
          subject:"news 1",
          text_short:"This is news article one.",
          text_long:"This is news article one. <br />Aftertaste latte, plunger pot, variety con panna steamed shop plunger pot grinder. Single origin cortado, half and half, doppio, single shot frappuccino caffeine irish breve aftertaste robust. So and froth, roast java cinnamon, bar wings caramelization chicory ristretto decaffeinated. Whipped frappuccino dark cinnamon, fair trade skinny turkish mug sit beans plunger pot.",
          date_created:"2016-09-01",
          project:1,
          user_data: {
              username:"admin"
          },
          image:"img/news_01.jpg"
      },{
          subject:"news 2",
          text_short:"This is news article two. Of course the preview of the news can be longer and contain more information.",
          text_long:"This is news article two. Of course the preview of the news can be longer and contain more information. <br /> <br /> Turkish, aroma seasonal lungo organic plunger pot, doppio extra mug mocha beans. Id variety half and half barista irish, and arabica, pumpkin spice aromatic mazagran doppio half and half. Skinny a percolator milk in extra brewed. Viennese et filter qui, id mocha aged, macchiato grinder macchiato strong mocha.",
          date_created:"2016-09-02",
          project:1,
          user_data: {
              username:"admin"
          },
          image:"img/news_02.jpg"
      },{
          subject:"news 3",
          text_short:"This is news article three.",
          text_long:"This is news article three.",
          date_created:"2016-09-03",
          project:2,
          user_data: {
              username:"admin"
          },
          image:"img/news_03.jpg"
      },{
          subject:"news 4",
          text_short:"This is news article four.",
          text_long:"This is news article four.",
          date_created:"2016-09-04",
          project:2,
          user_data: {
              username:"admin"
          },
          image:"img/news_04.jpg"
      },{
          subject:"news 5",
          text_short:"This is news article five.",
          text_long:"This is news article five.",
          date_created:"2016-09-05",
          project:2,
          user_data: {
              username:"admin"
          },
          image:"img/news_05.jpg"
      },{
          subject:"news 6",
          text_short:"This is news article six.",
          text_long:"This is news article six.",
          date_created:"2016-09-06",
          project:3,
          user_data: {
              username:"admin"
          },
          image:"img/news_06.jpg"
      } 
    ];
    
    $scope.cardPressed = function(e){
        var project = projects.number(e.project);
        var posts = [];
        angular.forEach($scope.entries, function(value){
           if (value.project == e.project) posts.push(value); 
        });
        $scope.content = {
            project: project, 
            posts: posts
        };
    }
})
.controller('BulletinEntryController', function($scope, $stateParams) {
    $scope.entry = $stateParams.content;
})
.controller('HomeController', function($scope){

});
angular.module('app.services',[])
.factory("projects",function(){
    var projects = [
        {
            id:1,
            name:"Project #1",
            text:"This is a description for project #1. It so seems that this project got something to do with coffee.<br /> <br /> Single origin milk blue mountain galão beans caffeine dark trifecta cortado. Aromatic, kopi-luwak turkish acerbic frappuccino a coffee frappuccino. Bar fair trade spoon, iced id cultivar strong sit dripper bar aromatic. Instant, skinny, cinnamon, et flavour doppio cup chicory. <br /><br />Qui barista mocha cup est that robusta mocha half and half. Americano medium filter crema crema medium trifecta aromatic a cappuccino café au lait trifecta. Wings, decaffeinated, froth mazagran, mocha americano brewed coffee dark. Redeye, saucer et aromatic single shot crema affogato.",
            image:"img/project_01.jpg"
        },{
            id:2,
            name:"Project #2",
            text:"This is a description for project #2. This is all about travelling somewhere.",
            image:"img/project_02.jpg"
        },{
            id:3,
            name:"Project #3",
            text:"This is a description for project #3. Interieur Design. Create a work atmosphere by simply arranging your working place so you can be more productive.",
            image:"img/project_03.jpg"
        }
    ]
    return {
        number: function (num) {
            var project = {};
            angular.forEach(projects, function(value){
               if (value.id === num) 
                   project = value; 
            });
            return project;
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