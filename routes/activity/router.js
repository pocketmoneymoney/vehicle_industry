
'use strict';

var jwt = require('jsonwebtoken');
var passport = require('passport');
var helper = require('../common/helper');

module.exports = function(express) {

    var _ = require('underscore');
    var logger = require('log4js').getLogger('server');

    var dao = require('./dao.js');

    var router = express.Router({mergeParams: true});

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

	router.put('/new', passport.authenticate('jwt', {session: false}), function(req, res) {
      var token = getToken(req.headers);
      if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
			if (decoded.role !== 'admin') {
				res.json({success: false, msg: "用户认证失败"});
				return;
			}
		});
	  }
	  var newID = helper.uniqueID(req.body.name);
      dao.addActivity(req.body['name'], newID, req.body['location'], req.body['time'], function (err, result) {
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
