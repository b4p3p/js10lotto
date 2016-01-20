require('./public/util');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(expressSession({
    secret: 'lakjdljoiejk___we2434lkjAAFF',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 * 60
    }
}));

// Usata nei file html
app.use('/views'            , express.static(__dirname + '/views'));
app.use('/public'           , express.static(__dirname + '/public'));
app.use('/bower_components' , express.static(__dirname + '/bower_components'));
app.use('/lib'              , express.static(path.join(__dirname, './lib')));

app.set('/views', __dirname + '/views');

// ROUTER ========
var router_main = express.Router();
require('./routes/router')(app, router_main);
app.use('/', router_main);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
//================
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send('error'+ err.message );
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error'+ err.message );
});

/*
 ======= req.session ==========
 {
 username: String - null se l'utente non Ã¨ autenticato
 }
 */

module.exports = app;