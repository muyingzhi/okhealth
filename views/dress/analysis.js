define(['app','jquery'],function(app,$){
    app.controller("analysisCtrl", ['$rootScope','$scope','DBService2web','$location','$routeParams',
        function($rootScope,$scope,dbService,$location, $routeParams){
            document.title = $scope.title="穿着分析";
            //---------设置顶端菜单
            $rootScope.topNav = "analysis";
            
        }
    ]);
})