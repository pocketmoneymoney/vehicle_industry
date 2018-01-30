'use strict'

var https = require('https');
var express = require('express');
var backendServer = require('./server.js');

var app = express();

startServer();

function startServer() {
    console.log('Start Server ...');

    app.get('/', function (req, res) { 
        res.send('Hello World!');
    }); 

    backendServer(app, express);

    app.listen(8088, function() {
        console.log('Server Started');
    });
}
