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