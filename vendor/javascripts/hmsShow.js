
(function(){
	var imgQr = document.getElementById("qrcode");
	
	//------向服务端发请求,获取qrcode的ticket
	var xhr = createXHR();
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 ){
			if ((xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304){
				var result = JSON.parse(xhr.responseText);
				if(result.errcode){
					alert('二维码取失败：'+result.errmsg);
					return;
				}
				//------显示二维码
				imgQr.src = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+result.ticket;
			} else {
				alert( '请求失败：'+xhr.status);
			}
		}
	}
	xhr.open("get", "/EHRBrowser/getWechatQrcode?id=1000", true);
	xhr.send();
	
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
})()