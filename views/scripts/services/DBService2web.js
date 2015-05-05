define(['services/services','jquery'],function(services,$){
	var http ;
	var webds = new WebDataStore($);
	var DB = function($q,$http){
		this.read = function(setName, selector){
			var d = $q.defer();
			var params = {};
			params.setName = setName;
			if(selector){
				params.selector = selector;
			}
			$http.jsonp("http://localhost:3000/dataService/find?callback=JSON_CALLBACK",
                {params:params})
                .success(function(data){
                	d.resolve(data);
                });
			return d.promise;
		};
		this.save = function(setName, document){
			var d = $q.defer();
			$http.jsonp("http://localhost:3000/dataService/save?callback=JSON_CALLBACK",
				{params:{setName:setName,document:document}}
			).success(
				function(data){
					d.resolve(data);
				});
			return d.promise;
		};
		this.remove = function(setName, document){
			var d = $q.defer();
			$http.jsonp("http://localhost:3000/dataService/remove?callback=JSON_CALLBACK",
				{params:{setName:setName,document:document}}
			).success(
				function(data){
					d.resolve(data);
				});
			return d.promise;

		}
	}
	services.service("DBService2web",['$q','$http',DB]);
});