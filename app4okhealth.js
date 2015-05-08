
var token = require('./config').token;
var express = require('express');
var ejs = require('ejs');
var path = require("path");
var http = require('http');
var bodyParser = require("body-parser");
var session = require('cookie-session');
var wechat = require('wechat');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var error = {};
//-------------views engine for HTML
var views = [];
views = path.join(__dirname, './views');//----设置views的目录，res.render()指定的页面路径由此开始
app.set('views', views);
app.set('view engine', 'html');         // app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(express.static(path.join(__dirname, './views')));//----设置静态文件路由相对路径
//----设置session
app.use(session({
    name: 'Msessionid',
    keys: ['key1','key2'],
    secret: 'key secret',
    maxAge: 900000
}));
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())

//---------不需要登录的route
app.use('/verfiy',wechat(token,function(req,res,next){
    if (req.method == "GET"){
        console.log("------wechat GET echostr:"+req.query.echostr);
        res.send(req.query.echostr);
        return;
    } else{
        require("./routes/WeixinServer").recieve(req,res,next);
    }
})
);
//----通过oauth2认证，获取微信用户，带入用户编辑页面
app.use("/oauthUser", require("./routes/WeixinServer").registBywx);

var userService = require("./routes/userService");
//----登录处理
app.use("/dologin", function(req, res){
    var query = req.body;
    var user = {username:query.username,password:query.password};
    userService.dologin(user,function(isOK){
        if(isOK){
            req.session.user = user;//用户信息写入session
            res.send({code:0,message:"ok"});
        }else {
            res.send({code:101,message:"登录失败"});
        }
    });
});

//----保存用户
app.use("/saveUser",function(req, res){
    var user = req.body;
    userService.saveUser(user,function(result){
        res.send(result);
    });
})
//----用户退出
app.use("/logout", function(req, res){
    if(req.session && req.session.user){
        req.session.user = null;//用户信息清空
    }
    res.send("logout success");
});
app.use("/getHospitals", function(req, res){
    doMongoDB(function(err, db){
        if(err){
            res.send(err||{code:-1});
        }
        var collection = db.collection('hospitals');
        collection.find().toArray(function(err,datas){
            var result = {code :0,list:datas};
            res.send(result);
            db.close();
        });
    });
});
app.use("/saveHospital",function(req, res){
    var result = {code:0};
    var hospital = req.body.hospital;
    console.log(hospital);
    doMongoDB(function(err,db){
        if(err){
            res.send(err);
        }
        var collection = db.collection('hospitals');
        collection.save(hospital, function(err){
            if(err){
                res.send(err);
            }else{
                res.send({code:0});
            }
            db.close();
        });
    })
})
//----显示微信菜单
app.use("/weixinMenu/menuInfo", function(req,res){
    require("./routes/menu4wx").showMenu(req,res);
});//require("./routes/menu4wx").showMenu);
//----检查session，以下的router需要用户登录
app.use(function(req, res, next) {
    var sess = req.session;
    if (sess && sess.user) {
        res.locals.user = sess.user;
    } else{
        console.log(req.url);
        //----未登录的转向登录页面
        res.send({"code" : "-1","message":"访问URL:"+req.path+"要求先登录"});
        //next();
    }
});
//----保存菜单到微信平台
app.use("/saveMenu4wx", require("./routes/menu4wx").saveMenu4wx);
        
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send( err.message);
    });
}
//----未知的url
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('404 Not Found in Health!');
    err.status = 404;
    console.log(err);
    res.render("./common/404.html",{message:"no found"+err});
});
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log("production error handler:----"+err.message);
    res.render("./common/404.html",err);
});
//********************************************************
function authentication(req, res, next) {
    if (!req.session.user) {
        req.session.error = '请先登陆';
    res.render("common/loginPage",{message:"请登录"});
    }
    next();
}
function notAuthentication(req, res, next) {
    if (req.session.user) {
        req.session.error = '已登陆';
        res.render("main/main");//----主页面
        return;
    }
    next();
}
function doMongoDB(callback){
        MongoClient.connect("mongodb://127.0.0.1:27017/test", function(err, db){
            if(err){
                callback(err||{code:-1});
            }
            callback(err,db);
        });
    }
module.exports = app;
