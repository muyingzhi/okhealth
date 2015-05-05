
(function(){
	var btn = document.getElementById("submitMenu");
	btn.onclick = function(){
		var buttons = document.querySelectorAll("div.menu01");
		var menu = {"button": []};
		for(var i=0; i<buttons.length; i++){
			//---------第一层菜单
			var btn = buttons[i];
			var inpBtn = btn.querySelector("input");
			if(inpBtn.value){
				//----有名称的菜单才会被记录
				menu.button[i] = {
					"name": inpBtn.value,
					"sub_button": []
				}
				//----------第二层菜单
				var sub_btns = btn.querySelectorAll("li");
				for(var j=0; j<sub_btns.length; j++){
					var subBtn = sub_btns[j];
					var inpSubName = subBtn.querySelector("input.menuName");
					var inpSubKey  = subBtn.querySelector("input.menuKey");	
					var selType = subBtn.querySelector("select");
					var keyType = null;
					var selectedOptions = getSelectedOptions(selType);
					if (!selectedOptions){
						keyType = selectedOptions[0].value;
					}else{
						keyType = 'click';
					}
					if(inpSubName.value){
						menu.button[i].sub_button[j] = {
							"name": inpSubName.value,
							"type": keyType,
							"sub_button":[]
						};
						if (keyType=='view'){
							menu.button[i].sub_button[j].url = inpSubKey.value
						} else {
							menu.button[i].sub_button[j].key = inpSubKey.value
						}
					}
				}
			}
		}
		//------向服务端发请求
		var xhr = createXHR();
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4 ){
				if ((xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304){
					alert("请求成功:"+xhr.responseText);
				} else {
					alert( '请求失败：'+xhr.status);
				}
			}
		}
		xhr.open("post", "/EHRBrowser/setWechatMenu", true);
		xhr.setRequestHeader("Content-Type", "text/json");
		xhr.send(JSON.stringify(menu));
	}
	function createXHR(){
		if(typeof XMLHttpRequest !="undefined"){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject != "undefined"){
			if (typeof arguments.callee.activeXString != "string"){
				var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
				i,len;
				for (i=0,len=versions.length;i<len;i++){
					try {
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
					}catch (ext){

					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}
	}
	function getSelectedOptions(selectbox){
		var result = new Array();
		var option = null;
		for (var i=0, len = selectbox.options.length;i<len;i++){
			option = selectbox.options[i];
			if (option.selected){
				result.push(option);
			}
		}
		return result;
	}
})()