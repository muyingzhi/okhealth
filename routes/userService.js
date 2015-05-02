/*
*接收前端的请求，整理数据成菜单json，
*通过api创建菜单，然后返回消息
*/

exports.dologin = function(user, callback){
	var one={
	    username:"admin",
	    password:"manager"
	};
	if(user.username==one.username && user.password==one.password){
		// //----记录登录时间
		// var usersManager = require("./UsersManager");
		//usersManager.loginRecord(user);
		// 显示菜单页面
        callback(true);
    }else{
        //return res.render("login/loginPage",user);
        callback(false);
    }

    // var usersManager = require('../../database/usersManager');
	// usersManager.findUserByName(user.username,function(users){
	// 	if(!users || !users[0]){
	// 		req.session.error="用户名未注册";
	// 		return res.render("login/loginPage",{message:"用户名未注册"});
	// 	}else{
	// 		if(users[0].password != user.password){
	// 			req.session.error="用户名或密码错误";
	// 			return res.render("login/loginPage",{message:"用户名或密码错误"});
	// 		}else{
	// 			// 显示菜单页面
	// 			req.session.user = user;
 //        		return res.redirect("menuInfo");
	// 		}
	// 	}
	// })
};
exports.logout = function(req, res){
	if(req.session && req.session.user){
		req.session.user = null;//用户信息清空
	}
};
exports.saveUser = function(user, callback){
	callback({code:"1",message:"数据保存未开发。"});
}