'use strict';

var util = require('util');
var log4js = require('log4js');
var mongoose = require('mongoose');

var logger = log4js.getLogger('service');

var database = module.exports = {};


database.init = function (ip, port, db, callback) {
    logger.info('Initialize db service', ip, port, db);

    var url = util.format('mongodb://%s:%d/%s', ip, port, db);
    mongoose.connect(url);
    var dbConn = mongoose.connection;

    dbConn.once('open', function (err) {
        logger.info('DB service started');
        if (err) {
            logger.error('Failed to connect to database !.', err);
        }

        callback(err, dbConn);
    });

    dbConn.once('error', function (err) {
        logger.error('DB service failed', err);
        callback(err, null);
    });
};
