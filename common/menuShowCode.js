function Mycontroller($scope,$http){
	var weixinData = window.modeData;//----接收来自node的数据
	var menus = weixinData.menu;
	//-----
	$scope.data = {};
	$scope.data.menu = menus;
	$scope.data.title = weixinData.title;
	$scope.types = [{name:"click",text:"点击"},
	{name:"view",text:"链接网页"},
	{name:"scancode_push",text:"扫一扫"}];
	$scope.saveMenu = function(){
		//------
		var newMenu = makeMeun4Form();
		//------向服务端发请求
		$http.defaults.headers.post["Content-Type"] = "text/json";
		$http.post(
			"saveMenu4wx",
			newMenu
		)
		.success(function(data, status, headers, config){
			alert("请求返回:"+data);
		})
		.error(function(data, status, headers, config){
			alert( '请求失败：'+status);
		});
	}
	$scope.logout = function(){
		$http.get("../logout").
		success(function(){
			window.location.href = "../views/index.html"
		}).
		error(function(){
			alert("error");
		});
	}
	//----表单数据转换为微信菜单
	function makeMeun4Form(){
		var datas = $scope.data.menu;
		var menu = {"button": []};
		for(var i=0; i<datas.length; i++){
			//---------第一层菜单
			var data = datas[i];
			if(data.name){
				//----有名称的菜单才会被记录
				menu.button[i] = {
					"name": data.name,
					"sub_button": []
				}
				//----------第二层菜单
				var sub_btns = data.sub_button;
				for(var j=0; j<sub_btns.length; j++){
					var sub = sub_btns[j];
					
					if(sub.name){//----有名字才会加为菜单
						if(sub.type){
							var subType = sub.type;

							menu.button[i].sub_button[j] = {
								"name": sub.name,
								"type": subType,
								"sub_button":[],
								"oauth":sub.oauth
							};
							if (subType=='view'){
								menu.button[i].sub_button[j].url = sub.key
							} else {
								menu.button[i].sub_button[j].key = sub.key
							}
						}
					}
				}
			}
		}
		return menu;
	}
}