
var token = require('./config').token;
var express = require('express');
var ejs = require('ejs');
var path = require("path");
var http = require('http');
var bodyParser = require("body-parser");
var session = require('cookie-session');
var wechat = require('wechat');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var app = express();
var error = {};
//-------------views engine for HTML
var views = [];
views = path.join(__dirname, './');//----设置views的目录，render函数指定的页面相对／health的路径
app.set('views', views);
app.engine('html', ejs.renderFile);
app.set('view engine', 'html'); // app.set('view engine', 'ejs');
//----js文件目录,在html中引用js文件采用这里定义的相对路径
app.use("/scripts",express.static(path.join(__dirname, '/scripts')));
app.use("/vendor",express.static(path.join(__dirname, '/vendor')));
app.use("/views",express.static(path.join(__dirname, '/views')));
app.use("/common",express.static(path.join(__dirname, '/common')));
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

app.use("/find", function(req, res){
    var setName = req.query["setName"];
    var callback = req.query["callback"];
    var selector = req.query["selector"];
    console.log("********************************************");
    console.log("[callback] : "+callback + " [FIND SET] :"+setName);
    if(!setName){
        resSendWithCallback(callback, {code:-1,"errmsg":"未指定查询集合的名称"}, res);
        return;
    }
    if(!selector){
        selector = {};
    }
    if(typeof selector =="string"){
        selector = JSON.parse(selector);
    }
    if(selector.title){
        selector = {title:new RegExp(selector.title,"i")};
    }
    console.log("selector:");
    console.log(selector);
    doMongoDB(function(err, db){
        if(err){
            resSendWithCallback(callback, (err||{code:-1}), res);
        }
        var collection = db.collection(setName);
        collection.find(selector).toArray(function(err,datas){
            console.log("检索数据记录数："+datas.length);
            var result = {code :0,
                list:datas,
                total:datas.length};
            resSendWithCallback(callback, result, res);
            db.close();
        });
    });
});
app.use("/save",function(req, res){
    var result = {code:0};
    var document = req.query.document;
    var setName = req.query["setName"];
    var callback = req.query["callback"];
    console.log("*******************************************");
    console.log("[callback]:"+callback + " [SAVE TO]:"+setName);
    if(typeof document == "string"){
        document = JSON.parse(document);
    }
    if(!document._id){//---新建的，生成_id;
        var objId = new ObjectID();
        document._id = objId.toHexString();
    }
    console.log(document);
    if(!setName){
        resSendWithCallback(callback, {code:-1,"errmsg":"未指定保存集合的名称"}, res);
        return;
    }
    doMongoDB(function(err,db){
        if(err){
            resSendWithCallback(callback ,(err||{code:-1}),res);
        }
        var collection = db.collection(setName);
        collection.save(document, function(err){
            if(err){
                resSendWithCallback(callback ,err, res);
            }else{
                resSendWithCallback(callback ,{"code":0},res);
            }
            db.close();
        });
    })
});
app.use("/remove",function(req, res){
    console.log("reomve");
    var setName = req.query.setName;
    var selector = req.query.document;
    var options = req.query.options||{};
    var callback = req.query.callback;
    console.log("*******************************************");
    console.log("[callback]:"+callback + " [REMOVE TO]:"+setName);
    if(typeof selector == "string"){
        selector = JSON.parse(selector);
    }
    if(!setName){
        resSendWithCallback(callback, {code:-1,"errmsg":"未指定删除数据集合的名称"}, res);
        return;
    }
    doMongoDB(function(err,db){
        if(err){
            resSendWithCallback(callback ,(err||{code:-1}),res);
        }
        var collection = db.collection(setName);
        collection.remove(selector, function(err){
            if(err){
                resSendWithCallback(callback ,err, res);
            }else{
                resSendWithCallback(callback ,{"code":0},res);
            }
            db.close();
        });
    })
})
//***********当callbackName有效，则支持jsonp返回；否则，返回对象
function resSendWithCallback(callbackName,obj,res){
    if(callbackName){
        res.send(callbackName + "("+JSON.stringify(obj)+")");
    }else{
        res.send(obj);
    }
}
//----检查session，以下的router需要用户登录
app.use(function(req, res, next) {
    var sess = req.session;
    if (sess && sess.user) {
        res.locals.user = sess.user;
    } else{
        console.log(req.url);
        //----未登录的转向登录页面
        //res.send({"code" : "-1","message":"访问URL:"+req.path+"要求先登录"});
        next();
    }
});
    
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send( err.message);
    });
}
//********************************************************
function doMongoDB(callback){
    MongoClient.connect("mongodb://127.0.0.1:27017/test", function(err, db){
        if(err){
            callback(err||{code:-1});
        }
        callback(err,db);
    });
}
module.exports = app;
