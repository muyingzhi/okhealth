define(['controller/controllers','jquery',
    'directives/checkboxDept','services/HealthDBService','services/DBService2web'],function(controllers,$){
    console.log("mainController start...");
    controllers.controller("mainController", ['$rootScope','$scope','$routeParams','$http','HealthDBService','DBService2web',
        function($rootScope,$scope,$routeParams,$http,HealthDBService,dbService){
            $scope.deptDict=HealthDBService.listDeptDict();
            var setName = "hospital";
            //-----
                var webds = new WebDataStore($);
            //---------设置顶端菜单
            var userid = $routeParams.uid;
            if(userid){
                //-----根据用户id查询权限菜单
                //-----设置菜单
                $rootScope.topNav = [
                {text:"微信菜单",href:"weixinMenu/menuInfo"},
                {text:$scope.language.exit,href:"#login/out"},
                {text:$scope.language.help,href:"#help"}
                ];
                $scope.notLogon = false;
            }else{
                $rootScope.topNav = [
                {text:$scope.language.login,href:"#login"},
                {text:$scope.language.help,href:"#help"}
                ];
                $scope.notLogon = true;
            }
            //----取医院列表
            var showList = function(data){
                if(data && data.code==0){
                    $scope.hospitals = data.list;
                }else{
                    $rootScope.message = ("失败:("+data.code+")"+data.errmsg);
                    $("#myModal").modal("show");
                }
            };
            $scope.refresh = function(){
                dbService.read(setName).then(showList
                    ,function(err){console.log(err)}
                    ,function(){console.log(arguments)})
                ;
            }
            $scope.refresh();
            //----------------
            $scope.saveHospital = function(){
                var doc = $scope.editOne;
                var saveCallback = function(data){
                    if(data && data.code==0){
                        $rootScope.message = ("保存成功");
                        $("#myModal").modal("show");
                        $scope.editOne = {};
                        $scope.refresh();
                    }else{
                        $rootScope.message = ("失败:("+data.code+")"+data.errmsg);
                        $("#myModal").modal("show");
                    }
                }
                if(!doc){
                    return
                }
                if(!doc.jgbm){
                    $rootScope.message = ("请填写编码");
                    $("#myModal").modal("show");
                    return
                }
                //----检索jgbm相同的记录；
                //----如果有，根据id检查是否是当前要保存的
                //----id相同，则是同一
                //----id不同，且当前id有效，那就是修改了jgbm，修改的值已经有另一个记录，不能保存
                //---------- 且当前id无，那么是新增，当时jgbm已经有记录，不能保存
                //----能保存的，使id＝jgbm；
                //doc._id = doc.jgbm;
                dbService.save(setName,doc).then(saveCallback);
            }
            //---------------
            $scope.clickOne = function(one){
                $scope.editOne = one;
            };
            $scope.isSelected = function(dict,item){
                for(var i=0;i<dict.length;i++){
                    if(dict[i]==item){
                        return true;
                    }
                }
                return false;
            };
            $scope.closeMsg = function(){
                $("#myModal").modal("hide");
            }
            $scope.addNew = function(){
                $scope.editOne = {};
            }
            $scope.addEquipment = function(){
                var equipment ={name:$scope.newEquipment};
                if(!$scope.editOne.equipment){
                    $scope.editOne.equipment = [];
                }
                if(!Array.isArray($scope.editOne.equipment)){
                    $scope.editOne.equipment = [];
                }
                $scope.editOne.equipment.push(equipment);
            }
            $scope.delEquipment = function(one){
                for(var i=0;i<$scope.editOne.equipment.length;i++){
                    if($scope.editOne.equipment[i].name == one.name){
                        $scope.editOne.equipment.splice(i,1);
                        break;
                    }
                }
            }
            $scope.removeHospital = function(one){
                var doc = $scope.editOne;
                if(!doc || !doc.jgbm){
                    return
                }
                var callback = function(data){
                    if(data && data.code==0){
                        $rootScope.message = ("删除成功");
                        $("#myModal").modal("show");
                        $scope.editOne = {};
                        $scope.refresh();
                    }else{
                        $rootScope.message = ("删除失败:("+data.code+")"+data.errmsg);
                        $("#myModal").modal("show");
                    }
                }
                dbService.remove(setName,doc).then(callback);
            }
            $scope.searchTitle = function(){
                $("#btnSearch").text("搜索中...");
                var selector = {};
                if($scope.sTitle){
                    selector.title = $scope.sTitle;
                }
                dbService.read(setName, selector).then(function(data){
                    showList(data);
                    $("#btnSearch").text("搜索");
                }
                    ,function(err){console.log(err)}
                    ,function(){console.log(arguments)})
                ;
            }
            $scope.showModal = function(){
                $('#myModal').modal();
            }
        }
    ]);
})