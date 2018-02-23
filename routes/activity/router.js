
'use strict';

var jwt = require('jsonwebtoken');
var passport = require('passport');
var helper = require('../common/helper');
var config = require('../../config');
var User = require("../user/model");

module.exports = function(express) {

    var _ = require('underscore');
    var logger = require('log4js').getLogger('server');

	  var multer = require('multer');
	  var path = require('path');
    var dao = require('./dao.js');

    var router = express.Router({mergeParams: true});

    var getToken = function (headers) {
        if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
            if (parted.length === 2) {
                return parted[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

	  var storage = multer.diskStorage({
    		destination: function (req, file, cb) {
      		cb(null, './public/activity')
    		},
    		filename: function (req, file, cb) {
      		cb(null, file.fieldname + '-' + Date.now())
    		}
	  });
	  var upload = multer({ storage: storage })

    router.get('/overview', function (req, res) {
         var page = req.query.page? parseInt(req.query.page) : 1;
         var num = req.query.num? parseInt(req.query.num) : 1;
		 var type = req.query.type;
         var start = page * num;
         dao.getActivityList(type, start, num, function (err, result) {
             res.send(JSON.stringify(result));
         });
    });

    router.get('/amount', function (req, res) {
        dao.getActivityAmount(function (err, result) {
            res.send(JSON.stringify(result));
	    });
    });

    router.get('/detail/:id', function (req, res) {
         dao.getActivityDetail(req.params.id, function (err, result) {
            res.send("Detail View:" + JSON.stringify(result));
         });
    });

	router.post('/new', upload.fields([{name: 'smallPoster', maxCount: 1},{name: 'bigPoster', maxCount: 1}, {name: 'tinyPoster', maxCount: 1}]), passport.authenticate('jwt', {session: false}), function(req, res) {
    if (req.user.role !== 'admin') {
				res.json({success: false, msg: "用户认证失败"});
        return;
    }
    /*
    var token = getToken(req.headers);
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
          User.findOne({username: decoded.username}, function(err, user) {
            if (user.role !== 'admin') {
				      res.json({success: false, msg: "用户认证失败"});
            }
          });
		    });
	  }
    */
	  var newID = helper.uniqueID(req.body.name);

    var bigPoster = null;
    var smallPoster = null;
    var tinyPoster = null;
    var bigPosterFile = req.files.bigPoster[0];
		if (bigPosterFile) {
			bigPoster = '/' + path.join(bigPosterFile.destination, bigPosterFile.filename);
		}
    var smallPosterFile = req.files.smallPoster[0];
		if (smallPosterFile) {
			smallPoster = '/' + path.join(smallPosterFile.destination, smallPosterFile.filename);
		}
    var tinyPosterFile = req.files.tinyPoster[0];
		if (tinyPosterFile) {
			tinyPoster = '/' + path.join(tinyPosterFile.destination, tinyPosterFile.filename);
		}

    var time = new Date(Number(req.body.time));
    dao.addActivity(req.body.name, newID, req.body.location, time, req.body.type, bigPoster, smallPoster, tinyPoster, function (err, result) {
		  if (err) {
			res.json({success: false, msg: "添加活动失败"});
		  }
		  else {
			res.json({success: true, msg: "添加活动成功"});
		  }
	  });
	});

    return router;
};
