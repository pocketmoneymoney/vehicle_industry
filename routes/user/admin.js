'use strict';

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

    router.post('/login', function(req, res) {
       var username = req.body.username;
       var password = req.body.password;

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
    });

    router.post('/book', passport.authenticate('jwt', { session: false}), function(req, res) {
      var token = getToken(req.headers);
      if (token) {
        jwt.verify(token, 'nodeauthsecret', function(err, decoded) {
            console.log(decoded);
            res.json(decoded);
        });
      }
    });

    return router;
};
