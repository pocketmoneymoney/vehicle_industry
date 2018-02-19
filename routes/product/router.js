'use strict';

module.exports = function(express) {

    var _ = require('underscore');
    var logger = require('log4js').getLogger('server');
	var multer = require('multer');
	var path = require('path');

	var jwt = require('jsonwebtoken');
	var passport = require('passport');

	var helper = require('../common/helper');
    var dao = require('./dao.js');

	var storage = multer.diskStorage({
  		destination: function (req, file, cb) {
    		cb(null, './public/product')
  		},
  		filename: function (req, file, cb) {
    		cb(null, file.fieldname + '-' + Date.now())
  		}
	});

	var upload = multer({ storage: storage })
    var router = express.Router({mergeParams: true});

    router.get('/:id', function (req, res) {
		dao.getProduct(req.params.id, function(err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
				res.json({success:true, msg:result});
			}
		});
	});

	router.post('/', function (req, res) {
		var id = req.body.id ? req.body.id : helper.uniqueID(req.body.name);
		var ownerID = req.body.ownerID;
		var name = req.body.name;
		var usage = req.body.usage;
		var capacity = req.body.capacity;
		var customer = req.body.customer;
		
		dao.updateProduct(id, ownerID, name, usage, capacity, customer, function (err) {
          	if (err) {
				res.json({success:false, msg:err});
			} else {
				res.json({success:true});
			}
		});
	});

    return router;
};
