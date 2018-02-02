'use strict'

var https = require('https');
var express = require('express');
var path = require('path');
var log4js = require('log4js');

var server = require('./routes/server.js');

var app = express();

setLogConfig();

startServer();

function startServer() {
    console.log('Start Server ...');

    var logger = log4js.getLogger('server');

    app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));

    app.use('/static', express.static('public'));

    app.get('/', function (req, res) { 
        res.send('Hello World!');
    }); 


    server(app, express);

    app.listen(8088, function() {
        console.log('Server Started');
    });
}


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
