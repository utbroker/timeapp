var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var moment = require('moment');

var index = require('./routes/index');
var users = require('./routes/users');
var hw = require('./routes/hw');
var time = require('./routes/time');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/hw', hw);
app.use('/:query', time);

// Time stamp Route
// app.get('/:query', function(req, res) {
// 	var date = req.params.query;
// 	var unix = null;
// 	var natural = null;
// 	// Check if Unix
// 	if (+date >= 0){
// 		unix = +date;
// 		natural = unixToNat(unix);
// 	}
// 	// Check if Natural
// 	if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
// 		unix = natToUnix(date);
// 		natural = unixToNat(unix);
// 	}
// 	var dateObj = {
// 		"unix": unix,
// 		"natural": natural
// 	};
// 	res.send(dateObj);
// });
// function natToUnix(date) {
// 	return moment(date, "MMMM D, YYYY").format("X");
// }
// function unixToNat(unix) {
// 	return moment.unix(unix).format("MMMM D, YYYY");
// }

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

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
