define(['app'],function(app){
        app.directive('radioLike',['DBService2web',function(ds){
	        return {
	            restrict:"EA",
                scope :{
                    ngModel:"=",
                    id:"@",
                    name:"@"
                },
                template : "<div ng-repeat='item in datas'>"+
							"<input id='{{id}}' name='{{name}}' type='radio' "+
							"value='{{item.opVal}}' ng-checked='ngModel.like==item.opVal' "+
							"ng-click='click(item.opVal)'/>{{item.text}}"+
						"</div>",
	            replace:true,
                link : function(scope,element,attrs){
                	scope.datas = [
                		{opVal:1,text:"喜欢"},
                		{opVal:2,text:"不喜欢"},
                		{opVal:3,text:"待定"}
                	];
                    
                    scope.click = function(code){
                        scope.ngModel.like = code;
                        var tmp = {};
                        tmp._id = scope.ngModel._id;
                        tmp.like = scope.ngModel.like;
                        tmp.tops = scope.ngModel.tops;
                        tmp.bottoms = scope.ngModel.bottoms;
                        tmp.shoes = scope.ngModel.shoes;

                        ds.save("match",tmp);
                    };
                }
	        };
	    }]);
    }
);