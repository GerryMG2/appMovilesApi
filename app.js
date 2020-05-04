var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/api');
var apiTRouter = require('./routes/apiTransaccional');


//configs
const {APP_KEY} = require("./config");

//mongo
const db = require("../app/utils/noRelationalDbConnections/mongoConnection");

const dbPinit = require("./scripts/databaseCreations");
dbPinit();

//session
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//before routes
//session
app.use(session({
  secret: APP_KEY,
  resave: true,
  saveUninitialized: true
}))

app.use('/api', apiRouter);
app.use('/apit', apiTRouter)

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
