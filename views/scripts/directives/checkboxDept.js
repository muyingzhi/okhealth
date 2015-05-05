define(['directives/directives'],function(directives){
        directives.directive('checkboxDept',[function(){
	        return {
	            restrict:"EA",
                scope :{
                    ngModel:"=",
                    id:"@",
                    name:"@"
                },
                template : '<span ng-repeat="item in datas">' +
                        '<input id="{{id}}" name="{{name}}" type="checkbox" value="{{item.id}}" ng-click="click($event,item.id)" ng-checked="ischecked(item.id)">{{item.text}}&nbsp;&nbsp;' +
                        '</span>',
	            replace:true,
                link : function(scope){
                    scope.datas = [
                        {id:"001",text:"内科"},
                        {id:"002",text:"外科"},
                        {id:"003",text:"儿科"},
                        {id:"004",text:"眼科"},
                        {id:"099",text:"其他"}];
                    scope.click = function($event,code){
                        var checkbox = $event.target;
                        if(checkbox.checked){
                            //------选中的
                            if(scope.ngModel){
	                           if(!(isElement4Array(scope.ngModel,code))){
                                    scope.ngModel.push(code);//未加入过的加入
                               };
                            }else{
                                scope.ngModel = [];
                                scope.ngModel.push(code);
                            }
                        }else{
                            //-----未选中
                            if(scope.ngModel){
                                for(var i=0;i<scope.ngModel.length;i++){
                                    if(scope.ngModel[i] && scope.ngModel[i]==code){
                                        scope.ngModel.splice(i,1);//删除
                                        break;
                                    }
                                }
                            }
                        }
                        console.log("click:" + code);
                    };
                    scope.ischecked = function(code){
                        var checked = false;
                        if(scope.ngModel){
                            checked = isElement4Array(scope.ngModel, code)
                        }
                        return checked;
                    }
                    function isElement4Array(a,e){
                        var flag = false;
                        for(var i=0;i<a.length;i++){
                            if(a[i] && a[i]==e){
                                flag =  true;
                                break;
                            }
                        }
                        return flag;
                    }
                }
	        };
	    }]);
    }
);