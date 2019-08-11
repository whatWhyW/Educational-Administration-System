var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 处理post请求的
var bodyParser = require('body-parser');
var cors = require('cors');


var app = express();

var session = require("express-session");
var MongoStore  = require("connect-mongo")(session);


app.use(cors({
  origin: ['http://localhost:8080'],
  methods: ['GET', 'POST'],
  Headers: ['Content-Type', 'POST', 'Authorization'],
}))

// 引入数据库
// var models = require('./models.js');
// 必须有这一条，不然引入不进来
var db = require('./models/db.js')
// 路由
app.use(session({
  secret: "adsfewaffewfewafpoewafoiefoieahfoiehoifhewoifhehfoiehfoihewoifhehfoiahewoifhehfoihewoifhoiefhoa",
  resave: false,
  saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/student');
var teacherRouter = require('./routes/teacher');
var uploadRouter = require('./routes/upload');
var managerRouter = require('./routes/manager');


// 这里设置的是一级路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/manager', managerRouter);
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);
app.use('/upload', uploadRouter);



app.get("/checkSession", function(req, res) {
  // 当访问本接口时 输出服务器端的session
  console.log('session检测')
  console.log(req.session);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
