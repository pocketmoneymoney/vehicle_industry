
'use strict';

var User = require("./model");
var config = require('../../config');
var helper = require('../common/helper');

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
            res.json({success: false, msg: 'Please pass username and password.'});
        } else {
			var newID = helper.uniqueID(req.body.username);
            var newUser = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                role: req.body.role,
                id: newID
            });
            newUser.save(function(err) {
                if (err) {
                    return res.json({success: false, msg: 'Username or email already exists.'});
                }
                var plainUser = {
					username: req.body.username, 
					password: req.body.password, 
					role: req.body.role, 
					email: req.body.email
				};
                var token = jwt.sign(plainUser, config.secret);
                res.json({success: true, token: 'JWT ' + token, 
						  role: req.body.role, id:newID, 
						  msg: 'Successful created new user.'});
            });
        }
    });

    router.post('/login', function(req, res) {
       User.findOne({username: req.body.username}, function(err, user) {
           if (err) throw err;
           if (!user) {
               res.send({success: false, msg: 'Authentication failed. User not found.'});
           } else {
               user.comparePassword(req.body.password, function (err, isMatch) {
                   if (isMatch && !err) {
                       var plainUser = {
							username: user.username, 
							password: user.password, 
							role: user.role, 
							email: user.email
						};
                       var token = jwt.sign(plainUser, config.secret);
                       res.json({success: true, token: 'JWT ' + token, 
								 role: user.role, id:user.id});
                   } else {
                       res.send({success: false, id:user.id,
								 msg: 'Authentication failed. Wrong password.'});
                   }
               });
           }
       });
    });

    router.post('/book', passport.authenticate('jwt', { session: false}), function(req, res) {
      var token = getToken(req.headers);
      if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            res.json(decoded);
        });
      }
    });

    return router;
};
