define(['app'],function(app){
        app.directive('checkToday',['DBService2web',function(ds){
	        return {
	            restrict:"EA",
                scope :{
                    ngModel:"=",
                    today:"@",
                    id:"@",
                    name:"@"
                },
                template : "<div>"+
							"今日穿着<input type='checkbox' "+
							"ng-checked='ischeck(ngModel)' "+
							"ng-click='click(ngModel)'/>"+
						"</div>",
	            replace:true,
                link : function(scope,element,attrs){
                	scope.ischeck = function(match){
                        var i = -1;
                        if(match.dressDate){
                            i = match.dressDate.indexOf(scope.today);
                        }
                        if(i>=0){
                            return true;
                        }else{
                            return false;
                        }
                    }
                    
                    scope.click = function(match){
                        if(!match.dressDate){
                            match.dressDate = [];
                        }
                        var checked = element.children("input")[0].checked;
                        var i = match.dressDate.indexOf(scope.today);
                        if(checked){//----选择
                            if(i<0){
                                match.dressDate.push(scope.today);
                            }
                        }else{//----取消选择
                            if(i>=0){
                                match.dressDate.splice(i,1);
                            }
                        }
                        //----保存数据
                        var tmp = {};
                        tmp._id = match._id;
                        tmp.like = match.like;
                        tmp.tops = match.tops;
                        tmp.bottoms = match.bottoms;
                        tmp.shoes = match.shoes;
                        tmp.dressDate = match.dressDate;
                        ds.save("match",tmp);
                    }
                }
	        };
	    }]);
    }
);