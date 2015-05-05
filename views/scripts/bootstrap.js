console.log("bootstrap...");
define(['domReady','angular'],function(domReady,angular){
    return function(){
        domReady(function(){
	        angular.bootstrap(document,["app"]);
        })
    }
});