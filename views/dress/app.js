//----------主要用来设置初始化参数等；app.config()
console.log("app...");
define(['angular','jquery'],
	function(angular,$){
    //--------------依赖controllers模块
    console.log("app.js :define.");
    var app = angular.module("app",[]);
    app.config(['$httpProvider',function ($httpProvider) {
    	//$httpProvider.responseInterceptors.push('HttpResponseInterceptor');
    	//$httpProvider.interceptors.push("HttpInterceptor");
		$httpProvider.defaults.transformRequest.push(function (data, headersGetter) {
    		// angular.element('#httpReq').text("正在处理请求......");
    		//$rootScope.message = ("正在处理请求......");
            $("#myModal").modal("show");
            // HttpMessageBox.show();
            // console.log(HttpReqMessageBox);
    		return data;
		});
		$httpProvider.defaults.transformResponse.push(function (data, headersGetter) {
    		// angular.element('#httpReq').text("");
			//rootScope.message = ("");
            $("#myModal").modal("hide");
            // HttpMessageBox.hide();
    		return data;
		});
	}]);
    return app;
});