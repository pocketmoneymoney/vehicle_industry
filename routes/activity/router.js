
'use strict';

var jwt = require('jsonwebtoken');
var passport = require('passport');
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

    router.get('/list', function (req, res) {
         var page = req.query.page? parseInt(req.query.page) : 1;
         var num = req.query.num? parseInt(req.query.num) : 1;
		 var type = req.query.type;
         var start = page * num;
         dao.getActivityList(type, start, num, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
			 	res.json({success:true, msg:result});
			}
         });
    });

    router.get('/all', function (req, res) {
        var page = req.query.page? parseInt(req.query.page) : 1;
        var num = req.query.num? parseInt(req.query.num) : 1;
        var start = page * num;
        dao.getAllActivity(req.query.userId, start, num, function(err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
			 	res.json({success:true, msg:result});
			}
        });
    });

    router.get('/amount', function (req, res) {
        dao.getActivityAmount(function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
			 	res.json({success:true, msg:result});
			}
	    });
    });

    router.get('/latest', function(req, res) {
      	dao.getLatestActivityDetail(req.query.type, function(err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
				res.json({success:true, msg:result});
			}
      	});
    });

    router.get('/appliers/:id', function (req, res) {
         dao.getActivityAppliers(req.params.id, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
			 	res.json({success:true, msg:result});
			}
         });
    });

    router.get('/:id', function (req, res) {
         dao.getActivityDetail(req.params.id, function (err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
			 	res.json({success:true, msg:result});
			}
         });
    });

    router.post('/:id/del', passport.authenticate('jwt', {session: false}), 
	  function (req, res) {
      	if (req.user.role !== 'admin') {
	  		res.json({success: false, msg: "用户认证失败"});
      	} else {
         	dao.deleteActivity(req.params.id, function (err, result) {
				if (err || !result) {
					res.json({success:false, msg:err});
				} else {
			 		res.json({success:true, msg:result});
				}
			});
    	}
	});

  	router.post('/new', upload.fields([{name: 'smallPoster', maxCount: 1},
	  {name: 'bigPoster', maxCount: 1}, {name: 'tinyPoster', maxCount: 1}]), 
	  passport.authenticate('jwt', {session: false}), function(req, res) {
      	if (req.user.role !== 'admin') {
	  		res.json({success: false, msg: "用户认证失败"});
          	return;
      	}
	    
      	var bigPoster = null;
      	var smallPoster = null;
      	var tinyPoster = null;

	  	if ((req.files.bigPoster) && (req.files.bigPoster[0])) {
      		var bigPosterFile = req.files.bigPoster[0];
	  		bigPoster = '/' + path.join(bigPosterFile.destination, bigPosterFile.filename);
	  	}
      
	  	if ((req.files.smallPoster) && (req.files.smallPoster[0])) {
			var smallPosterFile = req.files.smallPoster[0];
	  		smallPoster = '/' + path.join(smallPosterFile.destination, 
										  smallPosterFile.filename);
	  	}
      
	  	if ((req.files.tinyPoster) && (req.files.tinyPoster[0])) {
			var tinyPosterFile = req.files.tinyPoster[0];
	  		tinyPoster = '/' + path.join(tinyPosterFile.destination, 
										 tinyPosterFile.filename);
	  	}

      	var startTime = req.body.startTime;
      	var endTime = req.body.endTime;
	  	if (req.body.id) {
      		dao.modifyActivity(req.body.id, req.body.name, req.body.location, startTime, 
			  endTime, req.body.type, bigPoster, smallPoster, tinyPoster, 
			  function (err, result) {
	  	  		if (err) {
	  		  		res.json({success: false, msg: "添加活动失败"});
	  	  		} else {
	  	 	  		res.json({success: true, msg: "添加活动成功"});
	  	  		}
	   	  	});
		} else {
      		dao.addActivity(req.body.name, req.body.location, startTime, endTime,
		      req.body.type, bigPoster, smallPoster, tinyPoster, function (err, result) {
	  	  		if (err) {
	  		  		res.json({success: false, msg: "添加活动失败"});
	  	  		} else {
	  	 	  		res.json({success: true, msg: "添加活动成功"});
	  	  		}
	   	  	});
	  	}
	});

    router.post('/enroll', function(req, res) {
		var name = req.body.name;
		var email = req.body.email;
		var phone = req.body.phone;
		var company = req.body.company;
		var position = req.body.position;
		var comment = req.body.comment;
		var id = req.body.id;
		var personID = req.body.personID;
		var personRole = req.body.personRole;
		
		dao.addActivityApply(id, name, email, phone, company, position, 
		  comment, personID, personRole, function(err, result) {
			if (err || !result) {
				res.json({success:false, msg:err});
			} else {
		 		res.json({success:true, msg:result});
			}
		});
	});

    return router;
};
