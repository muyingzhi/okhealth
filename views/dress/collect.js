define(['app','jquery'],function(app,$){
    app.controller("collectCtl", ['$rootScope','$scope','DBService2web','$location','$routeParams',
        function($rootScope,$scope,dbService,$location, $routeParams){
            document.title = $scope.title="穿着收集";
            //---------设置顶端菜单
            $rootScope.topNav = "collect";
            $scope.dress = {tops:[],bottoms:[],shoes:[]};
            $scope.newOne = {type:"",jpg:""};
            //----点击“添加”，
            $scope.addClick = function(type){
                $scope.newOne.type = type;
                $scope.newOne.jpg  = "";
            }
            //----提交一个服装
            $scope.saveDress = function(fileid){
                return;
                var filename ;
                filename = document.getElementById(fileid).value;
                $scope.newOne.jpg = filename
                dbService.save("dress",$scope.newOne).then(function(){
                    listDress($scope.newOne);
                    $scope.newOne = {type:"",jpg:""};
                    alert("提交成功");
                });

            }
            dbService.read("dress").then(function(data){
                $.each(data.list,function(index,item){
                    listDress(item);
                })
                // $scope.dress = data.list;
            });
            function listDress(item){
                if(item.type==="001"||item.type=="tops"){
                        $scope.dress.tops.push(item);
                    }else if(item.type==="002"||item.type==="bottoms"){
                        $scope.dress.bottoms.push(item);
                    }else if(item.type==="003"||item.type==="shoes"){
                        $scope.dress.shoes.push(item);
                    }
            }
        }
    ]);
    app.controller("indexCtl",function($scope){
        $scope.selected = function(page){
                if($scope.topNav===page){
                    return "active";
                }else{
                    return "";
                }
            }

    })
})