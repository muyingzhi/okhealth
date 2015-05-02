var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var app = express();
// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//-------------views engine for HTML
var views = [];
app.use("/public/javascripts/jquery.min.map", function(req, res){
    res.send("");
})
app.use('/ok', require('./app4okhealth'));
app.use('/dataService', require('./dataService'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found 404!');
    err.status = 404;
    next(err);
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
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log("production error handler:----"+err.message);
    res.send(err.message);
});
module.exports = app;
