
var token = require('./config').token;
var express = require('express');
var ejs = require('ejs');
var path = require("path");
var fs = require('fs');
var bodyParser = require("body-parser");
var session = require('cookie-session');
var app = express();
var error = {};
var db ;
//-------------views engine for HTML
var views = [];

views = path.join(__dirname, './views');//----设置views的目录，res.render()指定的页面路径由此开始
app.set('views', views);
app.set('view engine', 'html');         // app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(express.static(path.join(__dirname, './views/dress')));//----设置静态文件路由相对路径
app.use(express.static(path.join(__dirname, './views/vendor')));//----设置静态文件路由相对路径
console.log("__dirname:"+__dirname);
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

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: "./views/dress/images"});
app.post('/upload-dress', multipartMiddleware, function(req, res) {
    // 获得文件的临时路径
    var tmp_path = req.files.fileTops.path;
    var i = tmp_path.indexOf("images");
    tmp_path = tmp_path.substring(i);
    console.log("tmp-path:"+tmp_path);
    // // 指定文件上传后的目录 - 示例为"images"目录。 
    // var target_path = './views/dress/images/' + req.files.fileTops.originalFilename;
    // // 移动文件
    // fs.link(tmp_path, target_path, function(err) {
    //   if (err) throw err;
    //   // 删除临时文件夹文件, 
    //   fs.unlink(tmp_path, function() {
    //      if (err) throw err;
    //      res.send('File uploaded to: ' + target_path + ' - ' + req.files.fileTops.size + ' bytes');
    //   });
    // });
    var document = {type:req.body.type,jpg:tmp_path};
    var collection = db.collection("dress");
    collection.save(document, function(err){
        if(err){
            throw err;
        }
    });
    res.send("upload ok");
});
app.setDataBase = function(database){
    db = database;
}
module.exports = app;
