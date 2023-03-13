var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
const sql = require('mssql');
var app = express();

// Use Azure VM Managed Identity to connect to the SQL database
const config = {
  server: 'sqlserver.database.windows.net',
  authentication: {
    type: 'azure-active-directory-msi-vm',
    options: {
      resource: 'https://database.windows.net/'
    }
  },
  options: {
    encrypt: true,
    database: 'sqlserver'
  }
};

// Connect to SQL database and execute a query
// void makeRequest(queryString) {
//   sql.connect(queryString, config=config, function (err) {
//     if (err) console.log(err);
//     var request = new sql.Request();
//     // query to the database and get the records
//     request.query(queryString, function (err, recordset) {
//         if (err) console.log(err)
//         // send records as a response
//         console.log(recordset);
//     });
//   });
// }


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
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
