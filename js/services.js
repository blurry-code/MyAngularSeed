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