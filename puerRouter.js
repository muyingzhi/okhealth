
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var express = require('express');

// var app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use("/doLogin",function(req, res){
// 	var user = req.body;
//     console.log(req);
//     res.send({code:0,message:"welcome to you:"+user.username}); 
// });
// module.exports = app;
module.exports =
{
    "POST /doLogin" : function(req, res){
    	var user = req.body;
    	console.log(typeof req);
        res.send({code:0,message:"welcome to you:"+(user?user.username:" ")});
    },
    "GET /logout" :function(req, res){
        res.send("");
    },
    "POST /saveUser" :function(req, res){
    	res.send("");
    }
}