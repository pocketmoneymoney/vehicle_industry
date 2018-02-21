
'use strict';

module.exports = function(express) {

    var _ = require('underscore');
    var logger = require('log4js').getLogger('server');
	var multer = require('multer');
	var path = require('path');

	var helper = require('../common/helper');
    var dao = require('./dao.js');

	var storage = multer.diskStorage({
  		destination: function (req, file, cb) {
    		cb(null, './public/admin')
  		},
  		filename: function (req, file, cb) {
    		cb(null, file.fieldname + '-' + Date.now())
  		}
	});

	var upload = multer({ storage: storage })
    var router = express.Router({mergeParams: true});

	router.post('/qrcode', upload.single('avatar'), function (req, res) {
		if (!req.file) {
            res.json({success:false, msg:"未指定上传文件"});
		} else {
			var qrPath = '/' + path.join(req.file.destination, req.file.filename);
			dao.updateQRCode(qrPath, function (err) {
				if (err) {
					res.json({success:false, msg:err});
				} else {
					res.json({success:true});
				}
			});
		}	
	});

	router.get('/qrcode', function (req, res) {
		dao.getQRCode(function (err, data) {
			if (err) {
				res.status(422).send(err);
			} else {
				res.status(200).send(JSON.stringify(data));
			}
		});
	});

	router.post('/logo', upload.single('avatar'), function (req, res) {
		if (!req.file) {
			res.status(422).send("No avatar file attached");
		} else {
			var logoPath = '/' + path.join(req.file.destination, req.file.filename);
			dao.updateLogo(logoPath, function (err) {
				if (err) {
					res.status(422).send(err);
				} else {
					res.status(200).send("OK");
				}
			});
		}	
	});

	router.get('/logo', function (req, res) {
		dao.getLogo(function (err, data) {
			if (err) {
				res.status(422).send(err);
			} else {
				res.status(200).send(JSON.stringify(data));
			}
		});
	});

	router.get('/advertise', function (req, res) {
		dao.getAdvertise(function (err, data) {
			if (err) {
				res.status(422).send(err);
			} else {
				res.status(200).send(JSON.stringify(data));
			}
		});
	});

	router.post('/advertise', upload.single('avatar'), function (req, res) {
		if (!req.file) {
			res.status(422).send("No avatar file attached");
		} else {
			var adPath = '/' + path.join(req.file.destination, req.file.filename);
			var link = req.body.link;
			var newAD = {
				'path':adPath, 
				'link':link, 
				'id': helper.uniqueID(req.file.filename)};
			dao.addAdvertise(newAD, function (err) {
				if (err) {
					res.status(422).send(err);
				} else {
					res.status(200).send("OK");
				}
			});
		}
	});

    return router;
};
