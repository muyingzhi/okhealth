define(['jquery','services/services'],function($,services){
	
	var s = function($rootScope){
		this.request = function(){
			$rootScope.message = ("正在处理请求......");
	        $("#myModal").modal("show");
	    }
	}
	services.service("HttpInterceptor",s);
});