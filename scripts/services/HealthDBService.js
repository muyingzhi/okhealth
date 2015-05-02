define(['services/services'],function(services){
	var http ;
	var HealthDB = function($http){
		http = $http;
	};
	HealthDB.prototype.listHospital = function(){
		return http.post("../getHospitals");
	};
	HealthDB.prototype.listDeptDict = function(){
		return ["内科","外科","儿科","妇科","中医科","康复科"];
	}
	HealthDB.prototype.saveHospital = function(hospital){
		return http.post("../saveHospital", hospital);
	}
	services.service("HealthDBService",['$http',HealthDB]);
});