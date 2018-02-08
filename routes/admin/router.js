
'use strict';

module.exports = function(express) {

    var _ = require('underscore');
    var logger = require('log4js').getLogger('server');
	var multer = require('multer');
	var path = require('path');

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
console.log(req);
		if (!req.file) {
			res.status(422).send("No avatar file attached");
		} else {
			var qrPath = '/' + path.join(req.file.destination, req.file.filename);
			dao.updateQRCode(qrPath, function (err) {
				if (err) {
					res.status(422).send(err);
				} else {
					res.status(200).send("OK");
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

    return router;
};
