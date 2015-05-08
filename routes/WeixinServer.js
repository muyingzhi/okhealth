/*
*接收前端的请求，整理数据成菜单json，
*通过api创建菜单，然后返回消息
*/
var wechat = require('wechat');
var OAuth = require('wechat').OAuth;
    //------从微信获取用户信息，作为数据带入userInfo页面中
exports.registBywx = function(req, res) {
    var code = req.adminUser.code;
    //var api = new API(config.appid, config.appsecret);
    var oauth = new OAuth(config.appid, config.appsecret);
    oauth.getAccessToken(code,function(err ,result ){
        if (err){
            res.send("oauth.getAccessToken:"+err);
        } else {
            var openid = result.data.openid;
            oauth.getUser(openid, function(err, data){
                res.render("users/userInfo", data);
            });
        }
    });
};
exports.weixinVerfiy = function(req,res,next){
    if (req.method == "GET") {
        console.log("------wechat GET echostr:" + req.query.echostr);
        res.send(req.query.echostr);
        return;
    }
}
exports.recieve = function(req,res,next){
    var message = req.weixin;
    if (message.MsgType == "text") {
        res.reply("Hello world:" + message.FromUserName + "。这是文本消息")
    } else if (message.MsgType == "event") {
        if (message.Event = "CLICK") {
            res.reply("CLICK:" + message.EventKey);
        } else if (message.Event == "SCAN") {
            res.reply("您扫描二维码，EventKey" + message.EventKey);
        } else if (message.Event == "subscribe") {
            res.reply("感谢您的关注。");
        } else if (message.Event == "unsubscribe") {
            res.reply("取消关注");
        } else if (message.Event == "scancode_push") {
            res.reply("您扫描二维码:" + message.EventKey + ";" + message.Ticket);
        } else if (message.Event == "VIEW") {
            //------跳转到对应的url,回应空
            res.send("");
            // LOCATION
        } else if (message.Event == "LOCATION") {
            //------跳转到对应的url,回应空
            res.send("");
        } else {
            res.reply("event:" + message.Event + ";" + message.EventKey);
        }
    } else {
        res.reply("未处理的类型：" + message.MsgType);
    }
};

