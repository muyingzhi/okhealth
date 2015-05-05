define(['controller/controllers','jquery'],function(controllers,$){
    controllers.controller("loginController", ['$rootScope','$scope','$http','$location','$routeParams',
        function($rootScope,$scope,$http,$location, $routeParams){
            document.title = $scope.title="云工作";
            //---------设置顶端菜单
            $rootScope.topNav = [
            ];   
            var out = $routeParams.out;
            if(out){
                //----退出的后端处理
                $http.get("logout").success(function(data){
                    console.log(data);
                });
            }      
            $scope.btnReset = function(){
            }
            $scope.doLogin = function(){
                var user = {username:$scope.username,password:$scope.password};
                $http.post("doLogin",user).
                    success(function(data, status, headers, config){
                        console.log("success");
                        if(data.code==0){
                            $location.path("main/001").replace();
                        }else {
                            $scope.message = "登录失败："+data.message;
                        }
                    }).
                    error(function(data, status, headers, config){
                        console.log("error");
                        $scope.message = "登录失败："+data.message;
                    });
            }
            $scope.registerUser = function(){
                $location.path("userEdit").replace();
            }
        }
    ]);
})