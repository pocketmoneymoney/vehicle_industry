
'use strict';

module.exports = function(app, express, config) {
    var _ = require('underscore');
    var log4js = require('log4js');

    var database = require('./db');

    var router = express.Router({mergeParams: true});

    // ----------------------------------------------------
    // Initialization
    // ----------------------------------------------------

    var logger = require('log4js').getLogger('server');

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

    	logger.info('Start to enable REST API');
    	app.use('/api', router);

	mountRouters(router);
       
        app.use(function (req, res, next) {
            res.status(404).send("Address not found");
            next();
        });

    });

    function mountRouters (router) {
    	var purchase = require('./purchase');
	var interview = require('./interview');

        purchase.mount(express, router);
        interview.mount(express, router);
    }
};
