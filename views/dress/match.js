define(['app','jquery','radioLike'],function(app,$){
    app.controller("matchCtl", ['$rootScope','$scope','DBService2web','$location','$routeParams',
        function($rootScope,$scope,dbService,$location, $routeParams){
            document.title = $scope.title="穿着收集";
            //---------设置顶端菜单
            $rootScope.topNav = "match";
            //$scope.likes = [{id:"1",text:'喜欢'},{id:"2",text:'不喜欢'},{id:"3",text:'待定'}];
            $scope.match = [];
            $scope.dress = {tops:[],bottoms:[],shoes:[]};
            
            //-----排列组合穷尽搭配
            $scope.doMatch = function(){
            	var newItems = [];
            	$.each($scope.dress.tops,function(index,tops){
            		$.each($scope.dress.bottoms,function(index,bottoms){
            			$.each($scope.dress.shoes,function(index,shoes){
            				var tmp = {tops:tops.jpg,bottoms:bottoms.jpg,shoes:shoes.jpg};
            				var isnew = true;
            				//----已存在搭配表的不会增加
            				$.each($scope.match,function(index,item){
            					if(item.tops == tops.jpg 
                                    && item.bottoms==bottoms.jpg
                                    && item.shoes==shoes.jpg){
            						isnew = false;
                                    return false;
            					}else{
            					}
            				})
            				if(isnew){
            					newItems.push(tmp);
            				}
            			})
            		})
            	});
            	$.each(newItems,function(index,item){
            		item.like = 3;
            		dbService.save("match",item);//保存搭配记录
            	})
            };
            $scope.readMatch = function(){
                readMatch();
            }
            readMatch();
            function readMatch(){
                $scope.match = [];
                $scope.dress = {tops:[],bottoms:[],shoes:[]};
                dbService.read("match").then(function(data){
                    $scope.match = data.list;
                });
                dbService.read("dress").then(function(data){
                //读取数据后，整理为上衣／下衣／鞋三类
                    $.each(data.list,function(index,item){
                        if(item.type==="001"||item.type=="tops"){
                            $scope.dress.tops.push(item);
                        }else if(item.type==="002"||item.type=="bottoms"){
                            $scope.dress.bottoms.push(item);
                        }else if(item.type==="003"||item.type=="shoes"){
                            $scope.dress.shoes.push(item);
                        }
                    })
                });
            }
        }
    ]);
})