
'use strict';

module.exports = function () {
    var express = require('express');	
    var logger = require('log4js').getLogger('server');
    var passport = require('passport');

    var router = express.Router({mergeParams: true});

    router.get('/login', function (req, res) {
         res.render('./admin_login.html');
    });

    router.get('/main', function (req, res) {
         res.render('./admin_main.html');
    });

    router.post('/login',
        passport.authenticate('login.admin',{
            successRedirect:'/user/admin/main',
            failureRedirect:'/user/admin/login',
            failureFlash:true
        }),function(req,res,next){
    });

    return router;
};
