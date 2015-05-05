//----------主要用来设置初始化参数等；app.config()
console.log("app...");
define(['angular','controller/controllers','services/services','directives/directives'],
	function(angular){
    //--------------依赖controllers模块
    var app = angular.module("app",["controllers","services",'directives']);
    app.config(function () {
    });
    return app;
});