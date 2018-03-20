
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
    		cb(null, './public/purchase')
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

         var id = req.query.id;
         dao.getPurchaseList(start, num, id, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
			 	res.json({success:true, msg:result});
			}
         });
    });

    router.get('/list_apply', function (req, res) {
         var page = req.query.page? parseInt(req.query.page) : 1;
         var num = req.query.num? parseInt(req.query.num) : 1;
         var start = page * num;

         var id = req.query.id;
         dao.getMyPurchaseList(start, num, id, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
			 	res.json({success:true, msg:result});
			}
         });
    });


    router.get('/amount', function (req, res) {
        dao.getPurchaseAmount(function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
			 	res.json({success:true, msg:result});
			}
		});
    });

	router.get('/search', function (req, res) {
		var keyword = req.query.keyword;
        var page = req.query.page? parseInt(req.query.page) : 1;
        var num = req.query.num? parseInt(req.query.num) : 1;
        var start = page * num;
		dao.search(keyword, start, num, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
				res.json({success:true, msg:result.data, totalPage:result.amount});
			}
		});
	});

    router.get('/:id', function (req, res) {
         dao.getPurchaseDetail(req.params.id, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
				res.json({success:true, msg:result});
			}
         });
    });

	router.get('/appliers/:id', function (req, res) {
         dao.getPurchaseAppliers(req.params.id, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
				res.json({success:true, msg:result});
			}
         });
	});

	router.post('/apply', function (req, res, next) {
		var name 		= req.body.name;
		var phone 		= req.body.phone;
		var email 		= req.body.email;
		var company 	= req.body.company;
		var position	= req.body.position;
		var comment 	= req.body.comment;
		var personID	= req.body.personID;
		var personRole  = req.body.personRole;
		var id			= req.body.id;
	
		dao.addPurchaseApply(id, name, phone, email, company, position, 
		  comment, personID, personRole, function (err) {
			if (err) {
				res.json({success: false, msg:err});
			} else {
				res.json({success: true});
			}
		});
	});

	router.post('/delete/:id', passport.authenticate('jwt', { session: false}),
	  function (req, res, next) {
         dao.deletePurchase(req.params.id, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
				res.json({success:true, msg:result});
			}
         });
	});

	router.post('/', upload.array('picture'), function (req, res, next) {
		var basic = {
			'name': req.body.name,
			'company': req.body.company,
			'phone': req.body.phone,
			'email': req.body.email,
			'productName': req.body.productName,
			'type': req.body.type,
			'detailType': req.body.detailType};

		var detail = {
			'material': req.body.material,
			'amount': req.body.amount,
			'description': req.body.description,
			'supplier': req.body.supplier};

		var publisher = {
			'publisherID': req.body.personID,
			'publisherRole': req.body.personRole};

		var id = req.body.id;
		var picture = undefined;
		
		if (req.files) {
			picture = [];
			for (var index = 0; index < req.files.length; index++) {
				var inputfile = req.files[index];
				var uploadpath = '/' + path.join(inputfile.destination, inputfile.filename);
				picture.push(uploadpath);
			}
		}

		if (id) {	
			dao.modifyPurchase(id, basic, detail, picture, function (err) {
				if (err) {
					res.json({success: false, msg:err});
				} else {
					res.json({success: true});
				}
			});
		} else {
			dao.addPurchase(basic, detail, publisher, picture, function (err) { 
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
