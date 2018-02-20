
'use strict';

module.exports = function(express) {

    var _ = require('underscore');
    var logger = require('log4js').getLogger('server');
	var multer = require('multer');
	var path = require('path');

	var jwt = require('jsonwebtoken');
	var passport = require('passport');

    var dao = require('./dao.js');

	var storage = multer.diskStorage({
  		destination: function (req, file, cb) {
    		cb(null, './public/supplier')
  		},
  		filename: function (req, file, cb) {
    		cb(null, file.fieldname + '-' + Date.now())
  		}
	});

	var upload = multer({ storage: storage })
    var router = express.Router({mergeParams: true});

    router.get('/list', function (req, res) {
         var page = req.query.page? parseInt(req.query.page) : 1;
         var num = req.query.num? parseInt(req.query.num) : 1;
         var start = page * num;
         dao.getSupplierList(start, num, function (err, result) {
             res.send(JSON.stringify(result));
         });
    });

    router.get('/amount', function (req, res) {
        dao.getSupplierAmount(function (err, result) {
            res.send(JSON.stringify(result));
		});
    });

    router.get('/person/:id', function (req, res) {
       	dao.getPersonInfo(req.params.id, function (err, result) {
			if (err) {
				res.json({success:false, msg:err});
			} else {
 				if (result) {
					res.json({success:true, msg:result['person']});
				} else {
					res.json({success:false, msg:"No data found"});
				}
			}
		});
	});

    router.get('/company/:id', function (req, res) {
       	dao.getCompanyInfo(req.params.id, function (err, result) {
			if (err) {
				res.json({success:false, msg:err});
			} else {
 				if (result) {
					res.json({success:true, msg:result['company']});
				} else {
					res.json({success:false, msg:"No data found"});
				}
			}
		});
	});

    router.get('/privilege', function (req, res) {
        var page = req.query.page? parseInt(req.query.page) : 0;
        var num = req.query.num? parseInt(req.query.num) : 1;
        var start = page * num;
       	dao.getPrevilegeInfo(start, num, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
				var ret = _.map(result, function(supplier) {
					var id = supplier? supplier['id']: 0;
					var owner = supplier? supplier['owner']: 'Unknown';
					var company = supplier && supplier['company']? 
						supplier['company']['name']: '';
					var verified = supplier && supplier['privilege']? 
						supplier['privilege']['verified']: false;
					var advertise = supplier && supplier['privilege']? 
						supplier['privilege']['advertise']: false;
					var superior = supplier && supplier['privilege']? 
						supplier['privilege']['superior']: false;

					return {'id': id,
							'owner': owner,
							'company': company,
							'verified': verified,
							'advertise': advertise,
							'superior': superior};
				});
				res.json({success:true, msg:ret});
			}
		});
	});


    router.get('/:id', function (req, res) {
         dao.getSupplierDetail(req.params.id, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
				res.json({success:true, msg:result});
			}
         });
    });


    router.post('/privilege/:id', passport.authenticate('jwt', { session: false}),
	  function (req, res) {
		var verified 	= req.body.verified;
		var advertise	= req.body.advertise;
		var superior	= req.body.superior;
		var id			= req.params.id;

		dao.modifyPrivilegeInfo(id, verified, advertise, superior, function (err) {
			if (err) {
				res.json({success: false, msg:err});
			} else {
				res.json({success: true});
			}
		});
	});


	router.post('/person/:id', passport.authenticate('jwt', { session: false}),
	  function (req, res, next) {
		var person 		= req.body.person;
		var email		= req.body.email;
		var phone		= req.body.phone;
		var id			= req.params.id;
		
		dao.modifyPersonInfo(id, person, email, phone, function (err) {
			if (err) {
				res.json({success: false, msg:err});
			} else {
				res.json({success: true});
			}
		});
	});

	router.post('/company/:id', passport.authenticate('jwt', { session: false}),
	  function (req, res, next) {
		var name    	= req.body.name;
		var product		= req.body.product;
		var customer	= req.body.customer;

		var brief 		= req.body.brief;
		var location 	= req.body.location;
		var market 		= req.body.market;

		var createTime  = req.body.createTime;
		var operator    = req.body.operator;
		var assets      = req.body.assets;

		var avatar 		= req.body.avatar;
		var id			= req.params.id;
	
		dao.modifyCompanyInfo(id, name, product, customer, brief, location, market, 
			createTime, operator, assets, function (err) {
			if (err) {
				res.json({success: false, msg:err});
			} else {
				res.json({success: true});
			}
		});
	});

	router.delete('/:id', function (req, res) {
		dao.deleteSupplier(req.params.id, function (err) {
            if (err) {
				res.json({success: false, msg:"Failed to remove supplier"});
            } else {
				res.json({success: true});
	    	}
		});	
	});

    return router;
};
