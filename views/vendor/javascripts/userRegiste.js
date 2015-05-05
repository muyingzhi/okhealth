
(function(){
	var btn = document.getElementById("btnSave");
	btn.onclick = function(){
		var user = {};
		user.openid = document.getElementById("openid");
		user.nickname = document.getElementById("nickname");
		user.openid = document.getElementById("openid");
		user.openid = document.getElementById("openid");
		//------向服务端发请求
		var xhr = createXHR();
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4 ){
				if ((xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304){
					alert("成功:"+xhr.responseText);
				} else {
					alert( '失败：'+xhr.status);
				}
			}
		}
		xhr.open("post", "/EHRBrowser/saveUser", true);
		xhr.setRequestHeader("Content-Type", "text/json");
		xhr.send(JSON.stringify(user));
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