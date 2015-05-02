var wechat = require('wechat');
var config = require('../config');
var querystring = require('querystring');
exports.showMenu = function(req, res){
	var API = wechat.API;
	var api = new API(config.appid, config.appsecret);
	api.getMenu(function(err, result){
		//----从微信获取菜单
		var sender={};
		sender.data = {};
		if (err) {
			sender.data.title = config.title + "(有异常：code="+err.code+")";
			sender.data.menu = [];
		}else{
			sender.data.title = config.title;
			sender.data.menu = initMenu(result.menu.button);//----规范需要的显示数据3*5
		}
		res.render("common/menuShow", sender);
	});
};
exports.saveMenu4wx = function(req, res){
	var menu = {};
	var API = wechat.API;
	var OAuth= wechat.OAuth;
	var api = new API(config.appid, config.appsecret);
	var oauth = new OAuth(config.appid, config.appsecret);
	var txt = '';
	req.on('data',function(chunk){
		txt += chunk;//--接收数据
	})
	req.on('end',function(){//--数据接收完毕
		if(!txt){
			res.send("no data");
			return;
		}
		menu = JSON.parse(txt);
		//---菜单中view，url（eventKey）需要转换为author2需要的url
		for(var i=0;i<menu.button.length;i++){
			if(menu.button[i].sub_button){
				for(var j=0;j<menu.button[i].sub_button.length;j++){
					var url = menu.button[i].sub_button[j].url;
					var oauthFlag = menu.button[i].sub_button[j].oauth;
					if(url && oauthFlag){

						menu.button[i].sub_button[j].url = 
							oauth.getAuthorizeURL(url,"shopping","snsapi_base");
					}
				}
			}
		}
		//---向微信提交菜单
		api.createMenu(menu,function(err, result){
			if(err){
				if(!result){resunt = {errmsg:"严重错误",errcode:"00"};}
				res.send("微信消息："+result.errmsg+result.errcode);
			}else{
				res.send("更新菜单完成");
			}
		});
	});
};
function initMenu(menus){
		if (!menus){ menus = [];}
		//-------微信菜单转化为标准的3*5的数组
		for(var i=0;i<3; i++){
			var menuBranch = menus[i];//-----一级菜单
			if ( !menuBranch){
				menuBranch = {name :"菜单"+i,sub_button :[]};//----没有时建立起
				menus[i] = menuBranch;
			}
			for(var j=0;j<5; j++){//-----子菜单
				var menuSub = menuBranch.sub_button[j];
				if (!menuSub){
					menuSub = {
						"type": "",
						"name": "",
						"key": "",
						"sub_button": []
					};//-------初始化
					menuBranch.sub_button[j] = menuSub;
				}else{
					//----为显示需要，做如下修改
					if(menuSub.type =="view"){
						var tmp = querystring.parse(menuSub.url);
						console.log(tmp);
						if(tmp.redirect_uri){
							menuSub.key = tmp.redirect_uri;
							menuSub.oauth = true;
						} else{
							menuSub.key = menuSub.url;
						}
						
					}
				}
			}
		}
		return menus;
	}
