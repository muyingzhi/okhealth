//----主要用来设置“前端路由”
require.config({
    paths:{
        jquery:  '../vendor/javascripts/jquery.min',
        angular: '../vendor/javascripts/angular.min',
        domReady:"../vendor/javascripts/domReady",
        twitter: "../vendor/javascripts/bootstrap.min",
        //easyui : "../vendor/easyui/jquery.easyui.min",
        //easyGroup : "../vendor/easyui/datagrid-groupview",
        //easyuizh_CN : "../vendor/easyui/locale/easyui-lang-zh_CN",
        indexedDB : "../vendor/javascripts/indexeddb"
        //calendarInput : "../vendor/calendarInput",
        //clone : "../vendor/clone"
    },
    shim:{
        'twitter' : {
            deps : ['jquery']
        }
        ,angular:{
            deps:['jquery','twitter'],
            exports:'angular'
        }
        // ,easyui : {
        //     deps : ['jquery']
        // }
        // ,easyGroup : {
        //     deps : ['easyui']
        // }
        // ,easyuizh_CN :{
        //     deps : ['easyui']        
        // }
        ,indexedDB : {
            deps : ['angular']
        }
    }
});
require([
    'angular',
    'app',
    'bootstrap',
    '../indexController',
    '../main/mainController',
    '../login/loginController',
    '../common/editUserController'
         ],
    function(angular,app,bootstrap){
	    'use strict';
        addStyle("vendor/stylesheets/bootstrap.min.css");
        addStyle("vendor/stylesheets/bootstrap-theme.min.css");   
        if(app==undefined){console.log("app is undefined");}
        
	    app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
            $routeProvider.
                when("/main",{
                    templateUrl:"main/main.html",
                    controller:"mainController"
                }).
                when("/main/:uid",{
                    templateUrl:"main/main.html",
                    controller:"mainController"
                }).
                when("/login",{
                    templateUrl:"login/loginPage.html",
                    controller:"loginController"
                }).
                when("/login/:out",{
                    templateUrl:"login/loginPage.html",
                    controller:"loginController"
                }).

                when("/userEdit",{
                    templateUrl:"common/editUser.html",
                    controller:"editUserController"
                }).
                otherwise({
                    redirectTo:"/main"
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