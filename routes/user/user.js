
'use strict';

var User = require("./model");
var config = require('../../config');
var helper = require('../common/helper');
var supplier = require('../supplier');

var jwt = require('jsonwebtoken');
var passport = require('passport');

require('./passport')(passport);

module.exports = function () {
    var express = require('express');	
    var logger = require('log4js').getLogger('server');
    var passport = require('passport');

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

    router.post('/register', function(req, res) {
        if (!req.body.username || !req.body.password) {
            res.json({success: false, msg: '请输入用户名和密码.'});
        } else {
			var newID = helper.uniqueID(req.body.username);
            var newUser = new User({
                username: req.body.username,
                password: req.body.password,
                role: req.body.role,
                id: newID
            });

            newUser.save(function(err) {
                if (err) {
                    return res.json({success: false, msg: '用户名已存在.'});
                }
				
				if (req.body.role == 'supplier') {
					var person = {
						'name': req.body.person,
						'phone': req.body.phone,
						'email': req.body.email
					};
					var company = {
						'name': req.body.company,
						'product': req.body.product,
						'customer': req.body.customer
					}

					supplier.create(req.body.username, newID, 
									person, company, function (err) {
						if (err) {
							newUser.remove({'username':req.body.username});
							res.json({success:false, msg:'创建用户失败'});
						} else {
                			var plainUser = {
								username: req.body.username, 
								password: req.body.password, 
								role: req.body.role,
                    			id: newID
							};
                			var token = jwt.sign(plainUser, config.secret);
                			res.json({success: true, token: 'JWT ' + token, 
						  			  role: req.body.role, id: newID,
						  			  msg: 'Successful created new user.'});
						}
					});
				} else {
               		var plainUser = {
						username: req.body.username, 
						password: req.body.password, 
						role: req.body.role,
                    	id: newID
					};
                	var token = jwt.sign(plainUser, config.secret);
                	res.json({success: true, token: 'JWT ' + token, 
							  role: req.body.role, id: newID,
							  msg: 'Successful created new user.'});
				}
            });
        }
    });

    router.post('/login', function(req, res) {
       User.findOne({username: req.body.username}, function(err, user) {
           if (err) {
             return res.json({success: false, msg: '请输入正确的用户名'});
           }

           if (!user) {
               res.send({success: false, msg: '认证失败，请输入正确的用户名.'});
           } else {
               user.comparePassword(req.body.password, function (err, isMatch) {
                   if (isMatch && !err) {
                       var plainUser = {
							username: user.username, 
							password: user.password, 
							role: user.role,
                            id: user.id
						};
                       var token = jwt.sign(plainUser, config.secret);
                       res.json({success: true, token: 'JWT ' + token, 
								 role: user.role, id: user.id});
                   } else {
                       res.json({success: false,
								 msg: '认证失败，请输入正确密码.'});
                   }
               });
           }
       });
    });

   	router.post('/password', passport.authenticate('jwt', { session: false}), function(req, res) {
    	User.findOne({username: req.body.username}, function(err, user) {
           	if ((err) || (!user)) {
             	return res.json({success: false, msg: err});
           	}

			user.comparePassword(req.body.password, function (err, isMatch) {
            	if (err || !isMatch) {
                	return res.json({success: false, msg: '认证失败，请输入正确密码.'});
				}

				user.password = req.body.password2;
				user.save(function (err) {
                	var plainUser = {
						username: user.username, 
						password: req.body.password2, 
						role: user.role,
                        id: user.id};
                 	var token = jwt.sign(plainUser, config.secret);
                    return res.json({success: true, token: 'JWT ' + token, 
				       		  		 role: user.role, id: user.id});
				});
			});
		});
	});


    router.post('/book', passport.authenticate('jwt', { session: false}), function(req, res) {
      var token = getToken(req.headers);
      if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            res.json(decoded);
        });
      } else {
		res.json({success: false, msg: "用户认证失败"});
	  }
    });

    return router;
};
