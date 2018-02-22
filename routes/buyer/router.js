
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
    		cb(null, './public/buyer')
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
         dao.getBuyerList(start, num, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
			 	res.json({success:true, msg:result});
			}
         });
    });

    router.get('/amount', function (req, res) {
        dao.getBuyerAmount(function (err, result) {
            res.send(JSON.stringify(result));
		});
    });

    router.get('/:id', function (req, res) {
         dao.getBuyerDetail(req.params.id, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
				res.json({success:true, msg:result});
			}
         });
    });

	router.post('/:id', passport.authenticate('jwt', { session: false}),
	  function (req, res, next) {
		var person 		= req.body.person;
		var email		= req.body.email;
		var phone		= req.body.phone;
		var id			= req.params.id;
		
		dao.modifyBuyer(id, person, email, phone, function (err) {
			if (err) {
				res.json({success: false, msg:err});
			} else {
				res.json({success: true});
			}
		});
	});

	router.post('/delete/:id', passport.authenticate('jwt', { session: false}),
	  function (req, res) {
		dao.deleteBuyer(req.params.id, function (err) {
            if (err) {
				res.json({success: false, msg:"Failed to remove buyer"});
            } else {
				res.json({success: true});
	    	}
		});	
	});

    return router;
};
