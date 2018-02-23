
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

	router.get('/appliers/:id', function (req, res) {
         dao.getPositionAppliers(req.params.id, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
				res.json({success:true, msg:result});
			}
         });
	});

	router.post('/apply', upload.single('resume'),
	  function (req, res, next) {
		var name 		= req.body.name;
		var phone 		= req.body.phone;
		var email 		= req.body.email;
		var positionID	= req.body.positionID;
		var id			= req.body.personID;
		var role		= req.body.role;
		var resume		= undefined;
		
		if (req.file) {
			resume = '/' + path.join(req.file.destination, req.file.filename);
		}

		dao.addPositionApply(positionID, name, phone, email, id, role, resume, function (err) {
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
