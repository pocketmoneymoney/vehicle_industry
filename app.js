'use strict'

var https = require('https');
var express = require('express');
var path = require('path');
var log4js = require('log4js');
var ejs = require('ejs');
var flash = require('connect-flash');

var server = require('./routes/server.js');
var logger = log4js.getLogger('server');

var app = express();

/////////////////////////////////////////////////////////
//    Setup express service configurations.
/////////////////////////////////////////////////////////
setLogConfig();

app.engine(".html", ejs.__express);
app.set("view engine", "html");

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

// Load authentication strategy.
require('./routes/user/auth.js');

console.log('Configure express app');

app.use(session({ secret: 'oeqiche as', cookie: { maxAge: 90000 }}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));
app.use('/static', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


console.log('Start Server ...');

server(app, express);

app.get('/', function (req, res) {
   res.send('hello world');
});

app.listen(8088, function() {
    console.log('Server Started');
});


function setLogConfig () {
    var logDir = path.join(__dirname, 'log');
    log4js.configure({
        appenders: {  
  	    serverLog:
            { type: 'file',
              filename: logDir + '/server.log',
              backups:3,
              layout: {
                  type: 'pattern',
                  pattern: "[%d{yyyy-MM-ddThh:mm:ss.SSSO}] [%p] %c - %m"
            }}
        },
        categories: {
            server: {appenders: ['serverLog'], level: 'info'},
            default: {appenders: ['serverLog'], level: 'info'},
        },
        "replaceConsole": true
    });

    console.log("Log Configuration and save to %s", logDir);
}
