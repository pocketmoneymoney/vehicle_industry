
'use strict';

module.exports = function(app, express, config) {
    var _ = require('underscore');
    var path = require('path');
    var util = require('util');
    var log4js = require('log4js');
    var log4jsConfig = require('./log4js.config');
    var database = require('./db');

    var router = express.Router({mergeParams: true});

    // ----------------------------------------------------
    // Initialization
    // ----------------------------------------------------
    setLogConfig();

    var logger = log4js.getLogger('server');

    app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));

    database.init('localhost', 27017, 'oeqiche', function (err) {
        if (err) {
            console.log('-----------------------------------------------------------');
            console.log('                                                           ');
            console.log('   Failed to start backend server !!!                      ');
            console.log('                                                           ');
            _.each(err, function(item) { console.log('  ', item); });
            console.log('-----------------------------------------------------------');
            return;
        } else {
            console.log('-----------------------------------------------------------');
            console.log('                                                           ');
            console.log('   Backend Server started                                  ');
            console.log('                                                           ');
            console.log('-----------------------------------------------------------');
        }


    });

    logger.info('Started REST API');

    function setLogConfig () {
        var logDir = util.format('%s/logs/', path.resolve('../..'));
        log4js.configure({
            appenders: {  
		serverLog:
                { type: 'file',
                  filename: 'server.log',
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
};
