
'use strict';

module.exports = function(express) {

    var _ = require('underscore');
    var logger = require('log4js').getLogger('server');
	var multer = require('multer');

    var router = express.Router({mergeParams: true});

	var storage = multer.diskStorage({
  		destination: function (req, file, cb) {
    		cb(null, './public/')
  		},
  		filename: function (req, file, cb) {
    		cb(null, file.fieldname + '-' + Date.now())
  		}
	});

	var upload = multer({ storage: storage })

    router.post('/profile', upload.single('avatar'), function (req, res, next) {
		console.log("file:", req.file);
		console.log("body:", req.body);
		res.send("OK");
	});

	return router;
};
