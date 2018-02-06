'use strict';

var User = require("../../models/user");
var config = require('../../config');

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

    router.get('/main', function (req, res) {
         res.render('./admin_main.html');
    });

    router.post('/register', function(req, res) {
        if (!req.body.username || !req.body.password) {
            res.json({success: false, msg: 'Please pass username and password.'});
        } else {
            var newUser = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                role: req.body.role
            });
            newUser.save(function(err) {
                if (err) {
                    return res.json({success: false, msg: 'Username or email already exists.'});
                }
                res.json({success: true, msg: 'Successful created new user.'});
            });
        }
    });

    router.post('/login', function(req, res) {

       User.findOne({username: req.body.username}, function(err, user) {
           if (err) throw err;
           if (!user) {
               res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
           } else {
               user.comparePassword(req.body.password, function (err, isMatch) {
                   if (isMatch && !err) {
                       var plainUser = {username: user.username, password: user.password, role: user.role, email: user.email};
                       var token = jwt.sign(plainUser, config.secret);
                       res.json({success: true, token: 'JWT ' + token, role: user.role});
                   } else {
                       res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                   }
               });
           }
       });
       /*
        var user = {
            id: '1',
            username: 'admin',
            password: 'pass'
        };

        if (username !== user.username) {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }

        if (password !== user.password) {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
        var token = jwt.sign(user, 'nodeauthsecret');
        res.json({success: true, token: 'JWT ' + token});
        */
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
