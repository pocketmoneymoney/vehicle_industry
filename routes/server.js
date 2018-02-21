
'use strict';

module.exports = function(app, express, config) {
    var _ = require('underscore');
    var log4js = require('log4js');

    var database = require('./common/db');
    var userAuthentication = require('./user');

    var router = express.Router({mergeParams: true});
    var userRouter = express.Router({mergeParams: true});

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

    	app.use('/api', function(req, res, next) {
			console.log('New API Request:', req.url, req.method);
			logger.info('New API Request:', req.url, req.method);
			next();
		}, router);

        app.use('/user', function(req, res, next) {
			console.log('New API Request:', req.url, req.method);
			logger.info('New API Request:', req.url, req.method);
			next();
		}, userRouter);

        userAuthentication.mount(express, userRouter);
		mountRouters(router);
       
        app.use(function (req, res, next) {
            res.status(404).send("Address not found");
            next();
        });

    });

    function mountRouters (router) {
    	var purchase = require('./purchase');
    	var product = require('./product');
    	var equipment = require('./equipment');
    	var certification = require('./certification');
    	var supplier = require('./supplier');
		var interview = require('./interview');
		var upload = require('./upload');
		var menu = require('./menu');
		var admin = require('./admin');

        purchase.mount(express, router);
        interview.mount(express, router);
        upload.mount(express, router);
        menu.mount(express, router);
        supplier.mount(express, router);
        product.mount(express, router);
        equipment.mount(express, router);
        certification.mount(express, router);
        admin.mount(express, router);
    }
};
