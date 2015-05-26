define(['app','jquery'],function(app,$){
    app.controller("analysisCtrl", ['$rootScope','$scope','DBService2web','$location','$routeParams',
        function($rootScope,$scope,dbService,$location, $routeParams){
            document.title = $scope.title="穿着分析";
            //---------设置顶端菜单
            $rootScope.topNav = "analysis";
            var teech = [{code:11,memo:"11",icon:"ok-circle",color:"default"},
            			{code:12,memo:"12",icon:"ok-circle",color:"default"},
            			{code:13,memo:"13",icon:"ok-circle",color:"default"},
            			{code:14,memo:"14",icon:"ok-circle",color:"default"},
            			{code:15,memo:"15",icon:"remove-circle",color:"warning"},
            			{code:16,memo:"16",icon:"ok-circle",color:"default"},
            			{code:17,memo:"17",icon:"ok-circle",color:"default"},
            			{code:21,memo:"21",icon:"ok-circle",color:"default"},
            			{code:22,memo:"22",icon:"ok-circle",color:"default"},
            			{code:23,memo:"23",icon:"ok-circle",color:"default"},
            			{code:24,memo:"24",icon:"ok-circle",color:"default"},
            			{code:25,memo:"25",icon:"remove-circle",color:"warning"},
            			{code:26,memo:"26",icon:"ok-circle",color:"default"},
            			{code:27,memo:"27",icon:"ok-circle",color:"default"},
            			{code:31,memo:"31",icon:"ok-circle",color:"default"},
            			{code:32,memo:"32",icon:"ok-circle",color:"default"},
            			{code:33,memo:"33",icon:"ok-circle",color:"default"},
            			{code:34,memo:"34",icon:"ok-circle",color:"default"},
            			{code:35,memo:"35",icon:"remove-circle",color:"warning"},
            			{code:36,memo:"36",icon:"ok-circle",color:"default"},
            			{code:37,memo:"37",icon:"ok-circle",color:"default"},
            			{code:41,memo:"41",icon:"ok-circle",color:"default"},
            			{code:42,memo:"42",icon:"ok-circle",color:"default"},
            			{code:43,memo:"43",icon:"ok-circle",color:"default"},
            			{code:44,memo:"44",icon:"ok-circle",color:"default"},
            			{code:45,memo:"45",icon:"remove-circle",color:"warning"},
            			{code:46,memo:"46",icon:"ok-circle",color:"default"},
            			{code:47,memo:"47",icon:"ok-circle",color:"default"}];
            $scope.t1 = [];
            $scope.t2 = [];
            $scope.t3 = [];
            $scope.t4 = [];
            for(var i=0;i<teech.length;i++){
            	if(teech[i].code<20){
            		$scope.t1.push(teech[i]);
            	}else if(teech[i].code>20 && teech[i].code<30){
            		$scope.t2.push(teech[i]);
            	}else if(teech[i].code>30 && teech[i].code<40){
            		$scope.t3.push(teech[i]);
            	}else if(teech[i].code>40){
            		$scope.t4.push(teech[i]);
            	}
            }
            $scope.click = function(one){
            	$scope.currentOne = one;
            }
        }
    ]);
})