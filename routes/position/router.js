
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
    		cb(null, './public/position')
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
         dao.getPositionList(start, num, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
			 	res.json({success:true, msg:result});
			}
         });
    });

    router.get('/amount', function (req, res) {
        dao.getPositionAmount(function (err, result) {
            res.send(JSON.stringify(result));
		});
    });


    router.get('/:id', function (req, res) {
         dao.getPositionDetail(req.params.id, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
				res.json({success:true, msg:result});
			}
         });
    });

	router.post('/apply/:id', passport.authenticate('jwt', { session: false}),
	  function (req, res, next) {
		var applier 	= req.body.applier;
		var applierID	= req.body.applierID;
		var resume		= "";
		var id			= req.params.id;

		dao.addPositionApply(id, applier, applierID, resume, function (err) {
			if (err) {
				res.json({success: false, msg:err});
			} else {
				res.json({success: true});
			}
		});
	});

	router.post('/delete/:id', passport.authenticate('jwt', { session: false}),
	  function (req, res, next) {
         dao.deletePosition(req.params.id, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
				res.json({success:true, msg:result});
			}
         });
	});

	router.post('/', passport.authenticate('jwt', { session: false}),
	  function (req, res, next) {
		var name 		= req.body.name;
		var company		= req.body.company;
		var brief		= req.body.brief;
		var id			= req.body.id;

		if (id) {	
			dao.modifyPosition(id, name, company, brief, function (err) {
				if (err) {
					res.json({success: false, msg:err});
				} else {
					res.json({success: true});
				}
			});
		} else {
			dao.addPosition(name, company, brief, function (err) {
				if (err) {
					res.json({success: false, msg:err});
				} else {
					res.json({success: true});
				}
			});
		}
	});

    return router;
};
