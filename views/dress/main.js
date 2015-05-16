//----主要用来设置“前端路由”
require.config({
    paths:{
        jquery:  'javascripts/jquery.min',
        angular: 'javascripts/angular.min',
        domReady:"javascripts/domReady",
        twitter: "javascripts/bootstrap.min",
        indexedDB : "javascripts/indexeddb"
    },
    shim:{
        'twitter' : {
            deps : ['jquery']
        }
        ,angular:{
            deps:['jquery','twitter'],
            exports:'angular'
        },indexedDB : {
            deps : ['angular']
        }
    }
});
console.log("main.js require.");
require([
    'angular',
    'app',
    'bootstrap',
    'collect','match','dress','analysis','DBService2web'],
    function(angular,app,bootstrap){
	    'use strict';
        addStyle("stylesheets/bootstrap.min.css");
        addStyle("stylesheets/bootstrap-theme.min.css");   
        if(app==undefined){console.log("app is undefined");}
        
	    app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
            $routeProvider.
                when("/collect",{
                    templateUrl:"collect.html",
                    controller:"collectCtl"
                }).
                when("/match",{
                    templateUrl:"match.html",
                    controller:"matchCtl"
                }).
                when("/dress",{
                    templateUrl:"dress.html",
                    controller:"dressCtl"
                }).
                when("/analysis",{
                    templateUrl:"analysis.html",
                    controller:"analysisCtrl"
                }).
                otherwise({
                    redirectTo:"/collect"
                });
            }]
        );
        bootstrap();
    }
);
function addStyle(stylePath) {
                var container = document.getElementsByTagName("head")[0];
                var addStyle = document.createElement("link");
                addStyle.rel = "stylesheet";
                addStyle.type = "text/css";
                addStyle.media = "screen";
                addStyle.href = stylePath;
                container.appendChild(addStyle);
            }