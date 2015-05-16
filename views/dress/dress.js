define(['app','jquery','checkToday'],function(app,$){
    app.controller("dressCtl", ['$rootScope','$scope','DBService2web','$location','$routeParams',
        function($rootScope,$scope,dbService,$location, $routeParams){
            document.title = $scope.title="穿着";
            //---------设置顶端菜单
            $rootScope.topNav = "dress";
            $scope.match = [];
            var now = new Date();
            $scope.today = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
            dbService.read("match").then(function(data){
            	$scope.match = data.list;
            })
            
        }
    ]);
})