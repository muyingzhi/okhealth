define(['angular','services/services'],function(angular,services){
	services.factory("HttpResponseInterceptor",function($q,$rootScope){
		return function (promise) {
			angular.element('#httpMsg').text("Interceptor:");
		    return promise.then(function (response) {
		    	angular.element('#httpReq').text("[]");
		    	
		    	angular.element('#httpRes').text("Response Interceptor:"+response.status);
		    	return response;
		    }, function (response) {
		    	if (response.status === 401) {
		        	$rootScope.$broadcast('event:loginRequired');
		    	} else if (response.status >= 400 && response.status < 500) {
		        	// ErrorService.setError('Server was unable to find what you were looking for... Sorry!!');
		    	}
		    	return $q.reject(response);
		    });
		};
	});
});