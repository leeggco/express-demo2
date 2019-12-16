var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
// 可配置的中間件
var mw = require('./public/javascripts/my-middleware')

var app = express();
// 全局请求中间件
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
// 使用中间件
app.use(myLogger)
// 在中间件中增加处理程序，这里给新增/修改requestTime的值
var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
// 使用中间件
app.use(requestTime)
// 赋值给中间件
app.use(mw({ option1: '1', option2: '2' }))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/create', articlesRouter);
// 需定义才能访问路由，并且url的格式是：/users/about
app.use('/about', usersRouter);
app.use('/register', usersRouter);
app.use('/login', usersRouter);

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
