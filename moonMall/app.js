var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Mock = require('mockjs');
var mongoose = require('mongoose');
var Interface = require('./api/interface/interface.model');

var routes = require('./routes/index');
var ticket = require('./routes/ticket');


var app = express();

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

mongoose.connect('mongodb://localhost/mock');
var db = mongoose.connection;
db.on('error',function(){
  console.log('connect error');
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'webapp')));

//app.use('/', routes);
app.use('/bluemoon-control/ticket',ticket);

app.use("/api/interface",require('./api/interface'))
//自定义路由
app.use('/*',function(req,res,next){
  //查询所有路由规则
  Interface.findAsync({url:req.baseUrl})
      .then(function(data){
        for(var i=0;i<data.length;i++){
          if(req.baseUrl==data[i].url) {
            //参数验证
            var jparams=JSON.parse(data[i].params);

            for(var key in req.body){
              console.log(key);
              console.log(req.body[key]);
            }


            for(var key in jparams){
                if(!req.body[key]){
                  res.send(Mock.mock(JSON.parse(data[i].failTpl)));
                  return;
                }
              console.log(key);

            }
            res.send(Mock.mock(JSON.parse(data[i].successTpl)));
            return;
          }
        }
        res.send("未找到模拟数据");
      })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
